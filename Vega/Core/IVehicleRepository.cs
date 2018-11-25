using System.Threading.Tasks;
using Vega.Core.Models;

namespace Vega.Core
{
    public interface IVehicleRepository
    {
        void Add(Vehicle vehicle);

        void Remove(Vehicle vehicle);

        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
    }
}