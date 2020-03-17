using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using DatabaseFirstWebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DatabaseFirstWebApi.Controllers
{
    [Microsoft.AspNetCore.Components.Route("[Controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly TestDatabaseContext _context;

        public UserController(TestDatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("api/getUsers")]
        public IEnumerable<User> getUsers()
        {
            //Response.Headers.Add("Some Random Header", "Some Random Value");
            
            return _context.User.ToList();

        }

        [HttpPost]
        [Route("api/ValidateUser")]
        public IActionResult ValidateUser([FromBody]User _user)
        {
            string id, pass, JsonData;
            if(_user.UserId != null)
            {
                id = _context.User.Where(a => a.UserId == _user.UserId).Select(a => a.UserId).FirstOrDefault();
                if(id != null)
                {
                    pass = _context.User.Where(a => a.UserId == _user.UserId).Select(a => a.Password).FirstOrDefault();
                    if(pass == _user.Password)
                    {
                        var JsonResult = new 
                        {
                            result = "Success"
                        };
                        JsonData = JsonConvert.SerializeObject(JsonResult);

                        //Response.Headers.Add("Some Random Header", "Some Random Value");

                        return Ok(JsonData);
                    }
                    else
                    {
                        var JsonResult = new
                        {
                            result = "Failed"
                        };
                        JsonData = JsonConvert.SerializeObject(JsonResult);
                        return Ok(JsonData);
                    }
                }
                else
                {
                    var JsonResult = new
                    {
                        result = "UserId does not exist"
                    };
                    JsonData = JsonConvert.SerializeObject(JsonResult);
                    return Ok(JsonData);
                }
            }
            else
            {
                var JsonResult = new
                {
                    result = "UserId not entered"
                };
                JsonData = JsonConvert.SerializeObject(JsonResult);
                return Ok(JsonData);
            }
        }

        [HttpPost]
        [Route("api/addUser")]
        public IActionResult addUser([FromBody]User _user)
        {
            string JsonData;
            string id = _user.UserId;
            User checkUser = _context.User.Find(_user.UserId);
            if(checkUser == null)
            {
                _context.User.Add(_user);
                _context.SaveChanges();
                var JsonResult = new
                {
                    result = "Success"
                };
                JsonData = JsonConvert.SerializeObject(JsonResult);
                return Ok(JsonData);
            }
            else
            {
                var JsonResult = new
                {
                    result = "Failed"
                };
                JsonData = JsonConvert.SerializeObject(JsonResult);
                return Ok(JsonData);
            }
        }

        [HttpGet]
        [Route("api/deleteUser/{id}")]
        public IActionResult deleteUser(string id)
        {
            string JsonData;
            User _user = _context.User.Find(id);
            if(_user != null)
            {
                _context.User.Remove(_user);
                _context.SaveChanges();
                var JsonResult = new
                {
                    result = "Success"
                };
                JsonData = JsonConvert.SerializeObject(JsonResult);
                return Ok(JsonData);
            }
            else
            {
                var JsonResult = new
                {
                    result = "Failed"
                };
                JsonData = JsonConvert.SerializeObject(JsonResult);
                return Ok(JsonData);
            }
        }

        [HttpPost]
        [Route("api/updateUser")]
        public IActionResult updateUser([FromBody]User _user)
        {
            string JsonData;

            if(_user != null)
            {
                _context.User.Update(_user);
                _context.SaveChanges();
                var JsonResult = new
                {
                    result = "700"
                };
                JsonData = JsonConvert.SerializeObject(JsonResult);
                string data;
                byte[] newdata = System.Text.Encoding.UTF8.GetBytes(_user.UserId);
                data = System.Convert.ToBase64String(newdata);
                HttpContext.Response.Headers.Add("_id", "data");
                return Ok(JsonData);
            }
            else
            {
                var JsonResult = new
                {
                    result = "701"
                };
                JsonData = JsonConvert.SerializeObject(JsonResult);
                return Ok(JsonData);
            }
        }
        
    }
}