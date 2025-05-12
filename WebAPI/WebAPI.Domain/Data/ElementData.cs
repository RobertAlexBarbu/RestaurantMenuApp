using WebAPI.Domain.Entities;

namespace WebAPI.Domain.Data;

public static class ElementData
{
    public static List<ElementCategory> GetCategories()
    {
        return
        [
            new ElementCategory { Name = "Alkali Metals" },
            new ElementCategory { Name = "Alkaline Earth Metals" },
            new ElementCategory { Name = "Transition Metals" },
            new ElementCategory { Name = "Post-transition Metals" },
            new ElementCategory { Name = "Metalloids" },
            new ElementCategory { Name = "Nonmetals" },
            new ElementCategory { Name = "Halogens" },
            new ElementCategory { Name = "Noble Gases" },
            new ElementCategory { Name = "Lanthanides" },
            new ElementCategory { Name = "Actinides" }
        ];
    }

    public static List<Element> GetElements(List<ElementCategory> elementCategories)
    {
        var loremIpsum = @"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia eros eget ante suscipit, non sollicitudin urna elementum. Quisque scelerisque felis ac nisi convallis, in cursus purus suscipit. Curabitur ac suscipit neque, ac cursus lorem. Mauris condimentum justo at felis tincidunt maximus.

Sed dictum, tortor sed tincidunt tincidunt, magna ipsum facilisis lectus, at iaculis enim ipsum vel odio. Nulla a venenatis neque. Cras sagittis, lorem vitae lobortis dapibus, erat lectus viverra ipsum, eu rutrum nunc odio sit amet ligula. Ut quis enim at orci placerat fermentum. Integer consequat metus ac nibh sollicitudin, sit amet iaculis nulla ullamcorper.";
        var categoryDictionary = new Dictionary<string, int>();
        foreach (var category in elementCategories) categoryDictionary[category.Name] = category.Id;
        return
        [
            new Element
            {
                Position = 1,
                Weight = 1.008,
                Name = "Hydrogen",
                Symbol = "H",
                Density = 0.00008988,
                MeltingPoint = 13.99f,
                BoilingPoint = -252.87f,
                AtomicRadius = 53,
                CategoryId = categoryDictionary["Nonmetals"], // Nonmetals
                Description = loremIpsum
            },
            new Element
            {
                Position = 2,
                Weight = 4.0026,
                Name = "Helium",
                Symbol = "He",
                Density = 0.0001786,
                MeltingPoint = -272.2f,
                BoilingPoint = -268.93f,
                AtomicRadius = 31,
                CategoryId = categoryDictionary["Noble Gases"], // Noble Gases
                Description = loremIpsum
            },
            new Element
            {
                Position = 3,
                Weight = 6.94,
                Name = "Lithium",
                Symbol = "Li",
                Density = 0.534,
                MeltingPoint = 180.54f,
                BoilingPoint = 1590f,
                AtomicRadius = 152,
                CategoryId = categoryDictionary["Alkali Metals"] // Alkali Metals
                ,
                Description = loremIpsum
            },
            new Element
            {
                Position = 4,
                Weight = 9.0122,
                Name = "Beryllium",
                Symbol = "Be",
                Density = 1.848,
                MeltingPoint = 1287f,
                BoilingPoint = 2471f,
                AtomicRadius = 112,
                CategoryId = categoryDictionary["Alkaline Earth Metals"],
                Description = loremIpsum
            },
            new Element
            {
                Position = 5,
                Weight = 10.81,
                Name = "Boron",
                Symbol = "B",
                Density = 2.34,
                MeltingPoint = 2076f,
                BoilingPoint = 3927f,
                AtomicRadius = 87,
                CategoryId = categoryDictionary["Metalloids"],
                Description = loremIpsum
            },
            new Element
            {
                Position = 6,
                Weight = 12.011,
                Name = "Carbon",
                Symbol = "C",
                Density = 2.267,
                MeltingPoint = 3550f,
                BoilingPoint = 4827f,
                AtomicRadius = 67,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Nonmetals"]
            },
            new Element
            {
                Position = 7,
                Weight = 14.007,
                Name = "Nitrogen",
                Symbol = "N",
                Density = 0.0012506,
                MeltingPoint = -210f,
                BoilingPoint = -195.79f,
                AtomicRadius = 56,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Nonmetals"]
            },
            new Element
            {
                Position = 8,
                Weight = 15.999,
                Name = "Oxygen",
                Symbol = "O",
                Density = 0.001429,
                MeltingPoint = -218.79f,
                BoilingPoint = -182.96f,
                AtomicRadius = 60,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Nonmetals"]
            },
            new Element
            {
                Position = 9,
                Weight = 18.998,
                Name = "Fluorine",
                Symbol = "F",
                Density = 0.001696,
                MeltingPoint = -219.62f,
                BoilingPoint = -188.12f,
                AtomicRadius = 64,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Halogens"]
            },
            new Element
            {
                Position = 10,
                Weight = 20.180,
                Name = "Neon",
                Symbol = "Ne",
                Density = 0.0008999,
                MeltingPoint = -248.59f,
                BoilingPoint = -246.05f,
                AtomicRadius = 38,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Noble Gases"]
            },
            new Element
            {
                Position = 11,
                Weight = 22.990,
                Name = "Sodium",
                Symbol = "Na",
                Density = 0.971,
                MeltingPoint = 97.72f,
                BoilingPoint = 883f,
                AtomicRadius = 186,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Alkali Metals"]
            },
            new Element
            {
                Position = 12,
                Weight = 24.305,
                Name = "Magnesium",
                Symbol = "Mg",
                Density = 1.738,
                MeltingPoint = 650f,
                BoilingPoint = 1090f,
                AtomicRadius = 160,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Alkaline Earth Metals"]
            },
            new Element
            {
                Position = 13,
                Weight = 26.982,
                Name = "Aluminum",
                Symbol = "Al",
                Density = 2.70,
                MeltingPoint = 660.32f,
                BoilingPoint = 2467f,
                AtomicRadius = 143,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Post-transition Metals"]
            },
            new Element
            {
                Position = 14,
                Weight = 28.085,
                Name = "Silicon",
                Symbol = "Si",
                Density = 2.3296,
                MeltingPoint = 1414f,
                BoilingPoint = 2900f,
                AtomicRadius = 118,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Metalloids"]
            },
            new Element
            {
                Position = 15,
                Weight = 30.974,
                Name = "Phosphorus",
                Symbol = "P",
                Density = 1.82,
                MeltingPoint = 44.2f,
                BoilingPoint = 280.5f,
                AtomicRadius = 110,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Nonmetals"]
            },
            new Element
            {
                Position = 16,
                Weight = 32.06,
                Name = "Sulfur",
                Symbol = "S",
                Density = 2.067,
                MeltingPoint = 115.21f,
                BoilingPoint = 444.6f,
                AtomicRadius = 104,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Nonmetals"]
            },
            new Element
            {
                Position = 17,
                Weight = 35.45,
                Name = "Chlorine",
                Symbol = "Cl",
                Density = 0.0032,
                MeltingPoint = -101.5f,
                BoilingPoint = -34.04f,
                AtomicRadius = 99,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Halogens"]
            },
            new Element
            {
                Position = 18,
                Weight = 39.948,
                Name = "Argon",
                Symbol = "Ar",
                Density = 0.001784,
                MeltingPoint = -189.34f,
                BoilingPoint = -185.85f,
                AtomicRadius = 71,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Noble Gases"]
            },
            new Element
            {
                Position = 19,
                Weight = 39.098,
                Name = "Potassium",
                Symbol = "K",
                Density = 0.862,
                MeltingPoint = 63.5f,
                BoilingPoint = 759f,
                AtomicRadius = 203,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Alkali Metals"]
            },
            new Element
            {
                Position = 20,
                Weight = 40.078,
                Name = "Calcium",
                Symbol = "Ca",
                Density = 1.54,
                MeltingPoint = 842f,
                BoilingPoint = 1484f,
                AtomicRadius = 197,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Alkaline Earth Metals"]
            },
            new Element
            {
                Position = 21,
                Weight = 40.08,
                Name = "Scandium",
                Symbol = "Sc",
                Density = 2.985,
                MeltingPoint = 1541f,
                BoilingPoint = 2836f,
                AtomicRadius = 162,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Transition Metals"]
            },
            new Element
            {
                Position = 22,
                Weight = 44.55,
                Name = "Titanium",
                Symbol = "Ti",
                Density = 4.506,
                MeltingPoint = 1668f,
                BoilingPoint = 3287f,
                AtomicRadius = 147,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Transition Metals"]
            },
            new Element
            {
                Position = 23,
                Weight = 47.87,
                Name = "Vanadium",
                Symbol = "V",
                Density = 6.11,
                MeltingPoint = 1910f,
                BoilingPoint = 3380f,
                AtomicRadius = 133,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Transition Metals"]
            },
            new Element
            {
                Position = 24,
                Weight = 50.94,
                Name = "Chromium",
                Symbol = "Cr",
                Density = 7.19,
                MeltingPoint = 1907f,
                BoilingPoint = 2671f,
                AtomicRadius = 128,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Transition Metals"]
            },
            new Element
            {
                Position = 25,
                Weight = 52.00,
                Name = "Manganese",
                Symbol = "Mn",
                Density = 7.43,
                MeltingPoint = 1244f,
                BoilingPoint = 2095f,
                AtomicRadius = 139,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Transition Metals"]
            },
            new Element
            {
                Position = 26,
                Weight = 55.85,
                Name = "Iron",
                Symbol = "Fe",
                Density = 7.874,
                MeltingPoint = 1538f,
                BoilingPoint = 2862f,
                AtomicRadius = 126,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Transition Metals"]
            },
            new Element
            {
                Position = 27,
                Weight = 58.93,
                Name = "Cobalt",
                Symbol = "Co",
                Density = 8.90,
                MeltingPoint = 1495f,
                BoilingPoint = 2927f,
                AtomicRadius = 125,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Transition Metals"]
            },
            new Element
            {
                Position = 28,
                Weight = 58.69,
                Name = "Nickel",
                Symbol = "Ni",
                Density = 8.912,
                MeltingPoint = 1455f,
                BoilingPoint = 2913f,
                AtomicRadius = 124,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Transition Metals"]
            },
            new Element
            {
                Position = 29,
                Weight = 63.55,
                Name = "Copper",
                Symbol = "Cu",
                Density = 8.96,
                MeltingPoint = 1084.62f,
                BoilingPoint = 2562f,
                AtomicRadius = 128,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Post-transition Metals"]
            },
            new Element
            {
                Position = 30,
                Weight = 65.38,
                Name = "Zinc",
                Symbol = "Zn",
                Density = 7.14,
                MeltingPoint = 419.58f,
                BoilingPoint = 907f,
                AtomicRadius = 139,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Post-transition Metals"]
            },
            new Element
            {
                Position = 31,
                Weight = 69.72,
                Name = "Gallium",
                Symbol = "Ga",
                Density = 5.91,
                MeltingPoint = 29.76f,
                BoilingPoint = 2204f,
                AtomicRadius = 135,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Post-transition Metals"]
            },
            new Element
            {
                Position = 32,
                Weight = 72.63,
                Name = "Germanium",
                Symbol = "Ge",
                Density = 5.323,
                MeltingPoint = 938.25f,
                BoilingPoint = 2833f,
                AtomicRadius = 122,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Metalloids"]
            },
            new Element
            {
                Position = 33,
                Weight = 74.92,
                Name = "Arsenic",
                Symbol = "As",
                Density = 5.727,
                MeltingPoint = 817f,
                BoilingPoint = 613f,
                AtomicRadius = 119,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Metalloids"]
            },
            new Element
            {
                Position = 34,
                Weight = 78.71,
                Name = "Selenium",
                Symbol = "Se",
                Density = 4.79,
                MeltingPoint = 221f,
                BoilingPoint = 684.9f,
                AtomicRadius = 116,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Nonmetals"]
            },
            new Element
            {
                Position = 35,
                Weight = 79.90,
                Name = "Bromine",
                Symbol = "Br",
                Density = 3.1028,
                MeltingPoint = -7.2f,
                BoilingPoint = 58.8f,
                AtomicRadius = 114,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Halogens"]
            },
            new Element
            {
                Position = 36,
                Weight = 83.80,
                Name = "Krypton",
                Symbol = "Kr",
                Density = 0.003733,
                MeltingPoint = -157.36f,
                BoilingPoint = -153.22f,
                AtomicRadius = 112,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Noble Gases"]
            },
            new Element
            {
                Position = 37,
                Weight = 85.47,
                Name = "Rubidium",
                Symbol = "Rb",
                Density = 1.532,
                MeltingPoint = 39.31f,
                BoilingPoint = 688f,
                AtomicRadius = 303,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Alkali Metals"]
            },
            new Element
            {
                Position = 38,
                Weight = 87.62,
                Name = "Strontium",
                Symbol = "Sr",
                Density = 2.64,
                MeltingPoint = 777f,
                BoilingPoint = 1384f,
                AtomicRadius = 249,
                Description = loremIpsum,
                CategoryId = categoryDictionary["Alkaline Earth Metals"]
            },
            new Element
            {
                Position = 39,
                Weight = 88.91,
                Name = "Yttrium",
                Symbol = "Y",
                Density = 4.469,
                MeltingPoint = 1526f,
                BoilingPoint = 3337f,
                Description = loremIpsum,
                AtomicRadius = 180,
                CategoryId = categoryDictionary["Transition Metals"]
            },
            new Element
            {
                Position = 40,
                Weight = 91.22,
                Name = "Zirconium",
                Symbol = "Zr",
                Density = 6.52,
                MeltingPoint = 1855f,
                BoilingPoint = 4377f,
                Description = loremIpsum,
                AtomicRadius = 160,
                CategoryId = categoryDictionary["Transition Metals"]
            },
            new Element
            {
                Position = 41,
                Weight = 92.91,
                Name = "Niobium",
                Symbol = "Nb",
                Density = 8.57,
                MeltingPoint = 2477f,
                BoilingPoint = 4744f,
                Description = loremIpsum,
                AtomicRadius = 146,
                CategoryId = categoryDictionary["Transition Metals"]
            },
            new Element
            {
                Position = 42,
                Weight = 95.95,
                Name = "Molybdenum",
                Symbol = "Mo",
                Density = 10.28,
                MeltingPoint = 2623f,
                BoilingPoint = 4639f,
                Description = loremIpsum,
                AtomicRadius = 139,
                CategoryId = categoryDictionary["Transition Metals"]
            },
            new Element
            {
                Position = 43,
                Weight = 98.00,
                Name = "Technetium",
                Symbol = "Tc",
                Density = 11.5,
                MeltingPoint = 2430f,
                BoilingPoint = 4538f,
                Description = loremIpsum,
                AtomicRadius = 139,
                CategoryId = categoryDictionary["Transition Metals"]
            },
            new Element
            {
                Position = 44,
                Weight = 101.07,
                Name = "Ruthenium",
                Symbol = "Ru",
                Density = 12.37,
                MeltingPoint = 2334f,
                BoilingPoint = 4150f,
                Description = loremIpsum,
                AtomicRadius = 137,
                CategoryId = categoryDictionary["Transition Metals"]
            },
            new Element
            {
                Position = 45,
                Weight = 102.91,
                Name = "Rhodium",
                Symbol = "Rh",
                Density = 12.41,
                MeltingPoint = 1964f,
                Description = loremIpsum,
                BoilingPoint = 3968f,
                AtomicRadius = 135,
                CategoryId = categoryDictionary["Transition Metals"]
            },
            new Element
            {
                Position = 46,
                Weight = 105.00,
                Name = "Palladium",
                Description = loremIpsum,
                Symbol = "Pd",
                Density = 12.02,
                MeltingPoint = 1555f,
                BoilingPoint = 2963f,
                AtomicRadius = 137,
                CategoryId = categoryDictionary["Transition Metals"]
            },
            new Element
            {
                Position = 47,
                Weight = 106.42,
                Name = "Silver",
                Description = loremIpsum,
                Symbol = "Ag",
                Density = 10.49,
                MeltingPoint = 961.78f,
                BoilingPoint = 2162f,
                AtomicRadius = 144,
                CategoryId = categoryDictionary["Post-transition Metals"]
            },
            new Element
            {
                Position = 48,
                Weight = 107.87,
                Name = "Cadmium",
                Symbol = "Cd",
                Density = 8.65,
                MeltingPoint = 321.07f,
                BoilingPoint = 765f,
                Description = loremIpsum,
                AtomicRadius = 151,
                CategoryId = categoryDictionary["Post-transition Metals"]
            },
            new Element
            {
                Position = 49,
                Weight = 112.41,
                Name = "Indium",
                Symbol = "In",
                Density = 7.31,
                Description = loremIpsum,
                MeltingPoint = 156.6f,
                BoilingPoint = 2072f,
                AtomicRadius = 162,
                CategoryId = categoryDictionary["Post-transition Metals"]
            },
            new Element
            {
                Position = 50,
                Weight = 114.82,
                Name = "Tin",
                Symbol = "Sn",
                Description = loremIpsum,
                Density = 7.31,
                MeltingPoint = 231.93f,
                BoilingPoint = 2602f,
                AtomicRadius = 162,
                CategoryId = categoryDictionary["Post-transition Metals"]
            },
            new Element
            {
                Position = 51,
                Weight = 118.71,
                Name = "Antimony",
                Description = loremIpsum,
                Symbol = "Sb",
                Density = 6.697,
                MeltingPoint = 630.63f,
                BoilingPoint = 1587f,
                AtomicRadius = 160,
                CategoryId = categoryDictionary["Metalloids"]
            },
            new Element
            {
                Position = 52,
                Weight = 121.76,
                Name = "Tellurium",
                Description = loremIpsum,
                Symbol = "Te",
                Density = 6.24,
                MeltingPoint = 452.0f,
                BoilingPoint = 988f,
                AtomicRadius = 146,
                CategoryId = categoryDictionary["Metalloids"]
            },
            new Element
            {
                Position = 53,
                Weight = 127.60,
                Name = "Iodine",
                Description = loremIpsum,
                Symbol = "I",
                Density = 4.933,
                MeltingPoint = 113.7f,
                BoilingPoint = 184.3f,
                AtomicRadius = 140,
                CategoryId = categoryDictionary["Halogens"]
            },
            new Element
            {
                Position = 54,
                Weight = 131.29,
                Name = "Xenon",
                Symbol = "Xe",
                Density = 0.005897,
                Description = loremIpsum,
                MeltingPoint = -111.79f,
                BoilingPoint = -108.12f,
                AtomicRadius = 140,
                CategoryId = categoryDictionary["Noble Gases"]
            },
            new Element
            {
                Position = 55,
                Weight = 132.91,
                Name = "Caesium",
                Symbol = "Cs",
                Density = 1.93,
                Description = loremIpsum,
                MeltingPoint = 28.44f,
                BoilingPoint = 671f,
                AtomicRadius = 303,
                CategoryId = categoryDictionary["Alkali Metals"]
            },
            new Element
            {
                Position = 56,
                Weight = 137.33,
                Name = "Barium",
                Symbol = "Ba",
                Description = loremIpsum,
                Density = 3.62,
                MeltingPoint = 727f,
                BoilingPoint = 1640f,
                AtomicRadius = 253,
                CategoryId = categoryDictionary["Alkaline Earth Metals"]
            },
            new Element
            {
                Position = 57,
                Weight = 138.91,
                Name = "Lanthanum",
                Description = loremIpsum,
                Symbol = "La",
                Density = 6.162,
                MeltingPoint = 920f,
                BoilingPoint = 3464f,
                AtomicRadius = 193,
                CategoryId = categoryDictionary["Lanthanides"]
            },
            new Element
            {
                Position = 58,
                Weight = 140.91,
                Name = "Cerium",
                Symbol = "Ce",
                Density = 6.77,
                Description = loremIpsum,
                MeltingPoint = 798f,
                BoilingPoint = 3257f,
                AtomicRadius = 185,
                CategoryId = categoryDictionary["Lanthanides"]
            },
            new Element
            {
                Position = 59,
                Weight = 144.24,
                Name = "Praseodymium",
                Description = loremIpsum,
                Symbol = "Pr",
                Density = 6.77,
                MeltingPoint = 931f,
                BoilingPoint = 3520f,
                AtomicRadius = 182,
                CategoryId = categoryDictionary["Lanthanides"]
            },
            new Element
            {
                Position = 60,
                Weight = 145.0,
                Name = "Neodymium",
                Symbol = "Nd",
                Density = 7.01,
                Description = loremIpsum,
                MeltingPoint = 1021f,
                BoilingPoint = 3068f,
                AtomicRadius = 180,
                CategoryId = categoryDictionary["Lanthanides"]
            }
        ];
    }
}