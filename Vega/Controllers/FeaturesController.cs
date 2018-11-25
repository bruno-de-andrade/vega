using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Vega.Core.Models;
using Vega.Persistence;
using Vega.Resources;


namespace Vega.Controllers
{
    public class FeaturesController : Controller
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;

        public FeaturesController(VegaDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("/api/features")]
        public async Task<IEnumerable<KeyValuePairResource>> GetFeatures()
        {
            var features = await context.Features.ToListAsync();

            return mapper.Map<List<Feature>, List<KeyValuePairResource>>(features);
        }
    }
}
