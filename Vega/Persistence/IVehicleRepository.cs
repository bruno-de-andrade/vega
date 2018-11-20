using System.Threading.Tasks;
using Vega.Models;

namespace Vega.Persistence
{
    public interface IVehicleRepository
    {
        void Add(Vehicle vehicle);

        void Remove(Vehicle vehicle);

        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
    }
}