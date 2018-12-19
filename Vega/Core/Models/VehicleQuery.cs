using Vega.Extensions;

namespace Vega.Core.Models
{
    public class VehicleQuery : IQueryObject
    {
        public string SortBy { get; set; }

        public bool IsSortAscending { get; set; }
    }
}