using Persistence;
using System;
using System.Linq;

namespace Web.Helpers
{
    public class MyAppHelper
    {
        public MyAppHelper(DataContext context)
        {
            Db = context;
        }
        private readonly DataContext Db;
        public int GenerateRecord(int authorId, int other = 0)
        {
            try
            {
                int maxAge;
                switch (other)
                { 
                    default:
                        maxAge = Db.People.Where(u => u.AuthorId == authorId).Max(p => p.Record);
                        break;
                }

                return maxAge + 1;
            }
            catch (Exception)
            {
                return 1;
            }

        }
    }
}