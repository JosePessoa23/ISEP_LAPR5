using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Armazens
{
    public class Coordenadas : IValueObject
    {
        public float Latitude { get; private set; }
        public float Longitude { get; private set; }
        public float Altitude {get; private set;}

        public Coordenadas(float latitude, float longitude, float altitude)
        {
            if(latitude < -90 || latitude > 90) 
                throw new BusinessRuleValidationException("A latitude tem que estar entre -90 e 90.");

            if(longitude < -180 || longitude > 180) 
                throw new BusinessRuleValidationException("A longitude tem que estar entre -180 e 180.");

            this.Latitude = latitude;
            this.Longitude = longitude;
            this.Altitude = altitude;
        }

        public override string ToString()
        {
            return "(" + this.Latitude + ", " + this.Longitude + ","+ this.Altitude + ")";
        }

        public override bool Equals(Object other){

            //check if same object
            Coordenadas that = (Coordenadas) other;
            if (this == that) {
                return true;
            }

            //verify parameters are equal
            return this.Latitude == that.Latitude && 
                this.Longitude == that.Longitude && 
                this.Altitude == that.Altitude;
        }

        public override int GetHashCode()
        {
            return this.Latitude.GetHashCode();
        }
    }
}
