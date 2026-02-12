using System.Collections.Generic;

namespace Web.ViewModels
{
    public class AuthorPlanOptionsViewModel
    {
        public int AuthorPlanId { get; set; }
        public List<OptionViewModel> AvailableOptions { get; set; }
        public List<int> SelectedOptionIds { get; set; }
    }
}
