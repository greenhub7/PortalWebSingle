using System;
using System.Collections.Generic;
using System.Text;

namespace CommonTasks.Data
{
    
    
    
    
    
    public class Compare<T> : IEqualityComparer<T>
    {
        
        
        
        readonly Func<T, T, bool> compareFunction;

        
        
        
        
        readonly Func<T, int> hashFunction;

        
        
        
        
        
        
        
        
        public Compare(Func<T, T, bool> compareFunction)
        {
            this.compareFunction = compareFunction;
        }

        
        
        
        
        
        
        
        
        
        
        
        public Compare(Func<T, T, bool> compareFunction, Func<T, int> hashFunction)
        {
            this.compareFunction = compareFunction;
            this.hashFunction = hashFunction;
        }

        
        
        
        
        
        
        
        
        
        
        
        public bool Equals(T x, T y)
        {
            return compareFunction(x, y);
        }

        
        
        
        
        
        
        
        
        
        public int GetHashCode(T obj)
        {
            return hashFunction(obj);
        }
    }
}
