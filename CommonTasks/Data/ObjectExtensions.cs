using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace CommonTasks.Data
{
    public static class ObjectExtensions
    {
        
        
        
        
        
        
        
        static void Transfer(
            object source,
            object target,
            List<string> toSkip = null,
            bool copyNullSource = true,
            bool replaceNullDestination = true)
        {
            var sourceType = source.GetType(); 
            var targetType = target.GetType(); 

            
            var sourceParameter = Expression.Parameter(typeof(object), "source");
            var targetParameter = Expression.Parameter(typeof(object), "target");

            
            var sourceVariable = Expression.Variable(sourceType, "castedSource");
            var targetVariable = Expression.Variable(targetType, "castedTarget");

            var expressions = new List<Expression>
            {
                
                Expression.Assign(sourceVariable, Expression.Convert(sourceParameter, sourceType)),
                Expression.Assign(targetVariable, Expression.Convert(targetParameter, targetType))
            };

            foreach (var property in sourceType.GetProperties(BindingFlags.Public | BindingFlags.Instance))
            {
                
                if (!property.CanRead)
                    continue;

                
                
                if (!copyNullSource && property.GetValue(source) == null)
                    continue;

                
                if (toSkip != null)
                    if (toSkip.Contains(property.Name, StringComparer.OrdinalIgnoreCase))
                        continue;

                var targetProperty = targetType.GetProperty(property.Name, BindingFlags.Public | BindingFlags.Instance);

                if (targetProperty != null
                        && targetProperty.CanWrite 
                        && targetProperty.PropertyType.IsAssignableFrom(property.PropertyType))
                {
                    
                    if (!replaceNullDestination && targetProperty.GetValue(target) == null)
                        continue;

                    expressions.Add(
                        Expression.Assign( 
                            Expression.Property(targetVariable, targetProperty),
                            Expression.Convert(
                                    Expression.Property(sourceVariable, property), targetProperty.PropertyType)));
                }
            }

            
            var lambda =
                Expression.Lambda<Action<object, object>>(
                    Expression.Block(new[] { sourceVariable, targetVariable }, expressions),
                    new[] { sourceParameter, targetParameter });

            var del = lambda.Compile(); 

            del(source, target); 
        }

        
        
        
        
        
        
        
        
        
        public static void Transfer<SourceType, TargetType>(
            this SourceType source,
            ref TargetType targetObj,
            string toSkip = null,
            bool copyNullSource = true,
            bool replaceNullDestination = true)
            where TargetType : class, new()
            where SourceType : class
        {
            targetObj ??= new TargetType();
            if (toSkip != null)
            {
                List<string> skipList = toSkip.Split(',').Where(s => !String.IsNullOrEmpty(s))
                    .Select(s => s.Trim()).ToList();
                Transfer(source, targetObj, skipList, copyNullSource, replaceNullDestination);
            }
            else
            {
                Transfer(source, targetObj, null, copyNullSource, replaceNullDestination);
            }
        }

        
        
        
        
        
        
        
        public static T GetCustomAttribute<T>(this object source)
            where T : class
        {
            var type = source.GetType();

            return type.GetCustomAttributes(typeof(T), true).FirstOrDefault() as T;
        }

        
        
        
        
        
        
        
        
        public static T GetCustomAttribute<T, U>(this U source)
            where T : class
            where U : ICustomAttributeProvider
        {
            return source.GetCustomAttributes(typeof(T), true).FirstOrDefault() as T;
        }

        
        
        
        
        
        
        
        public static U ConvertTo<U>(this object source)
        {
            try
            {
                Type conversionType = Nullable.GetUnderlyingType(typeof(U)) ?? typeof(U);
                return (U)Convert.ChangeType(source, conversionType);
            }
            catch
            {
                return default;
            }
        }
    }
}
