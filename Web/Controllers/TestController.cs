using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [AllowAnonymous]
    public class TestController : Controller
    {
        public IActionResult FormTest()
        {
            return View();
        }

        public IActionResult FieldConsolidation()
        {
            return View();
        }

        // New action for testing with mock data
        public IActionResult PrintWithMockData()
        {
            return View();
        }
    }
}
