using api.Models;
using api.Settings;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FitnessController : ControllerBase
{
    private readonly IMongoCollection<FitUser> _collection;
    public FitnessController(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<FitUser>("fit-users");
    }

    [HttpPost("register")]
    public ActionResult<FitUser> Create(FitUser userIn)
    {
        FitUser user = new FitUser(
            Id: null,
            FirstName: userIn.FirstName,
            LastName: userIn.LastName,
            Email: userIn.Email,
            Mobile: userIn.Mobile,
            Weight: userIn.Weight,
            Height: userIn.Height,
            Bmi: userIn.Bmi,
            BmiResult: userIn.BmiResult,
            Gender: userIn.Gender,
            RequireTrainer: userIn.RequireTrainer,
            Package: userIn.Package,
            Important: userIn.Important,
            HaveGymBefore: userIn.HaveGymBefore,
            EnquiryDate: userIn.EnquiryDate
        );

        _collection.InsertOne(user);

        return user;
    }

    [HttpGet("get-all")]
    public ActionResult<IEnumerable<FitUser>> GetAll()
    {
        List<FitUser> fitUsers = _collection.Find<FitUser>(new BsonDocument()).ToList();

        if (!fitUsers.Any())
            return NoContent();

        return fitUsers;
    }

    [HttpGet("get-fit-user-by-id/{userId}")]
    public ActionResult<FitUser> GetFitUser(string userId)
    {
        FitUser fitUser = _collection.Find(v => v.Id == userId).FirstOrDefault();

        if (fitUser == null)
        {
            return NoContent();
        }

        return fitUser;
    }

    [HttpPut("update/{userId}")]
    public ActionResult<UpdateResult> UpdateByFitId(string userId, FitUser userIn)
    {
        var updatedFit = Builders<FitUser>.Update
        .Set((FitUser doc) => doc.FirstName, userIn.FirstName)
        .Set(doc => doc.LastName, userIn.LastName)
        .Set(doc => doc.Email, userIn.Email)
        .Set(doc => doc.Mobile, userIn.Mobile)
        .Set(doc => doc.Weight, userIn.Weight)
        .Set(doc => doc.Height, userIn.Height)
        .Set(doc => doc.Bmi, userIn.Bmi)
        .Set(doc => doc.BmiResult, userIn.BmiResult)
        .Set(doc => doc.Gender, userIn.Gender)
        .Set(doc => doc.RequireTrainer, userIn.RequireTrainer)
        .Set(doc => doc.Package, userIn.Package)
        .Set(doc => doc.Important, userIn.Important)
        .Set(doc => doc.HaveGymBefore, userIn.HaveGymBefore)
        .Set(doc => doc.EnquiryDate, userIn.EnquiryDate);

        return _collection.UpdateOne<FitUser>(doc => doc.Id == userId, updatedFit);
    }

    [HttpDelete("delete/{userId}")]
    public ActionResult<DeleteResult> Delete(string userId)
    {
        return _collection.DeleteOne<FitUser>(doc => doc.Id == userId);
    }
}
