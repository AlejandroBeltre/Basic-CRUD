using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.classes
{
    public record class JwtOptions
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string SigningKey { get; set; }
        public int ExpirationSeconds { get; set; }
    }
}