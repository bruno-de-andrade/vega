using System.Threading.Tasks;

namespace Vega.Persistence
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}
