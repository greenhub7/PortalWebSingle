using CommonTasks.Data;
using Domain;
using System;
using Web.Models;

namespace Web.Helpers
{
    public class ToViewHelpers
    {
        public static Person ToPeople(PatientView view)
        {
            if (view == null) throw new ArgumentNullException(nameof(view));

            var m = new Person(); 
            view.Transfer(ref m, null, false);

            return m;

            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            ;
        }

        public static Patient ToPatient(PatientView view)
        {
            if (view == null) throw new ArgumentNullException(nameof(view));
            var m = new Patient(); 
            view.Transfer(ref m, null, false);
            return m;
            
            
            
            
            
            
            
            
            

            ;
        }

   

    }
}