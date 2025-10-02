import React, { useState, useMemo } from 'react';
import { Sliders, Home, MapPin, Target, Compass, BookOpen, ChevronDown, CheckCircle, XCircle } from 'lucide-react';

// --- COLLEGE DATA ---
// Scores are 1 (low/poor) to 5 (high/excellent) for the desired attribute.
// GE_RIGOR is inverse: 1 (easiest/fewest courses) to 5 (hardest/most courses).
const collegeData = [
  {
    name: "Revelle College",
    theme: "The Liberal Arts and Sciences",
    ge_rigor: 5, // Most rigorous/prescriptive (HUM sequence, Math/Science requirements)
    housing_modernity: 1, // Oldest college, mix of old dorms and apartments
    centrality: 3, // Central-West, close to Price Center/Library
    vibe: "Academically Focused, Traditional"
  },
  {
    name: "John Muir College",
    theme: "Individual Responsibility and Development",
    ge_rigor: 2, // Most flexible GE requirements ("Sequenced Breadth")
    housing_modernity: 1, // Older dorms/apartments, generally considered dated
    centrality: 4, // Central-North, very convenient to center
    vibe: "Chill, Outdoorsy, Free-Spirited"
  },
  {
    name: "Thurgood Marshall College",
    theme: "The Scholar and the Citizen",
    ge_rigor: 4, // Moderate-High GE (DOC sequence, specific breadth requirements)
    housing_modernity: 2, // Mix of older dorms and apartments
    centrality: 2, // Central-South/East, near RIMAC/Theater District
    vibe: "Social Justice, Community Engagement"
  },
  {
    name: "Earl Warren College",
    theme: "Toward a Life in Balance",
    ge_rigor: 2, // Low GE (two Programs of Concentration, flexible)
    housing_modernity: 3, // Mostly older apartment style, which many prefer
    centrality: 3, // Mid-campus West
    vibe: "Ethical Inquiry, Well-Roundedness"
  },
  {
    name: "Eleanor Roosevelt College",
    theme: "International/Global Context",
    ge_rigor: 4, // High GE (MMW sequence, language/regional specialization)
    housing_modernity: 3, // Mix of older and newer apartments (IR)
    centrality: 1, // Far North/West, often called "ERC-far"
    vibe: "Global Awareness, Diplomatic"
  },
  {
    name: "Sixth College",
    theme: "Culture, Art, and Technology (CAT)",
    ge_rigor: 3, // Medium GE (CAT sequence, interdisciplinary)
    housing_modernity: 5, // Moved to new, very modern housing (NTPLLN)
    centrality: 5, // Very central, near the new trolley station/Pepper Canyon
    vibe: "Innovative, Interconnected, Artistic"
  },
  {
    name: "Seventh College",
    theme: "A Changing Planet",
    ge_rigor: 3, // Medium-High GE (The Nexus sequence, 5 Areas of Focus)
    housing_modernity: 5, // Newest college, all modern housing
    centrality: 4, // North/East side, generally considered very convenient
    vibe: "Interdisciplinary, Climate Focus, New"
  },
  {
    name: "Eighth College",
    theme: "Engagement & Community",
    ge_rigor: 3, // Medium GE (CCE sequence, anti-racism focus)
    housing_modernity: 5, // Newest college, all modern housing
    centrality: 2, // North/East side, slightly less central than Seventh
    vibe: "Social Justice, Anti-Racism, Wellness"
  },
];

const SliderControl = ({ label, icon: Icon, value, onChange }) => (
  <div className="mb-6 p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl">
    <div className="flex items-center justify-between mb-3 text-lg font-semibold text-gray-700">
      <div className="flex items-center">
        <Icon className="w-5 h-5 mr-2 text-blue-600" />
        {label}
      </div>
      <span className="text-xl font-mono text-blue-600">{value}</span>
    </div>
    <input
      type="range"
      min="1"
      max="10"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer range-lg"
      style={{
        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${value * 10 - 5}%, #dbeafe ${value * 10 - 5}%, #dbeafe 100%)`
      }}
    />
    <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Low Weight</span>
        <span>High Weight</span>
    </div>
  </div>
);

const CollegeCard = ({ college, rank, totalScore }) => {
    const isGEPrio = totalScore.ge_rigor_weight > totalScore.housing_weight && totalScore.ge_rigor_weight > totalScore.centrality_weight;

    // Determine the color based on GE Rigor (inverse)
    const geColor = college.ge_rigor === 5 ? 'text-red-500' : 
                    college.ge_rigor === 1 || college.ge_rigor === 2 ? 'text-green-600' : 
                    'text-yellow-600';

    // Determine the background color based on rank
    const rankColor = rank === 1 ? 'bg-amber-100 border-amber-500 shadow-amber-300' :
                      rank === 2 ? 'bg-slate-100 border-slate-400 shadow-slate-300' :
                      rank === 3 ? 'bg-yellow-100 border-yellow-500 shadow-yellow-300' :
                      'bg-white border-gray-200 shadow-md';

    return (
        <div className={`p-5 mb-4 rounded-xl transition-all duration-500 ${rankColor} border-2 transform hover:scale-[1.01] hover:shadow-xl`}>
            <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-extrabold flex items-baseline">
                    <span className={`mr-3 w-8 h-8 flex items-center justify-center text-white rounded-full ${rank === 1 ? 'bg-amber-500' : 'bg-blue-600'}`}>{rank}</span>
                    <h2 className="text-2xl text-blue-800">{college.name}</h2>
                </div>
                <div className="text-2xl font-bold text-gray-700">
                    {Math.round(totalScore.score)}
                    <span className="text-base font-normal ml-1 text-gray-500">pts</span>
                </div>
            </div>
            
            <p className="text-sm italic text-gray-600 mb-4">{college.vibe} | Theme: {college.theme}</p>

            <div className="grid grid-cols-3 gap-3 text-sm font-medium">
                <div className="p-3 rounded-lg bg-blue-50">
                    <div className="flex items-center mb-1 text-gray-600">
                        <BookOpen className="w-4 h-4 mr-1" /> GE Rigor 
                    </div>
                    <span className={`${geColor} font-bold`}>
                        {college.ge_rigor === 5 ? 'Very High' : 
                         college.ge_rigor === 4 ? 'High' : 
                         college.ge_rigor === 3 ? 'Medium' : 
                         'Low/Flexible'}
                    </span>
                    <span className="text-xs text-gray-500"> ({college.ge_rigor}/5)</span>
                </div>

                <div className="p-3 rounded-lg bg-blue-50">
                    <div className="flex items-center mb-1 text-gray-600">
                        <Home className="w-4 h-4 mr-1" /> Housing Modernity
                    </div>
                    <span className="text-gray-800 font-bold">
                        {college.housing_modernity === 5 ? 'New' : 
                         college.housing_modernity >= 4 ? 'Modern' : 
                         college.housing_modernity >= 3 ? 'Mixed' : 
                         'Older'}
                    </span>
                    <span className="text-xs text-gray-500"> ({college.housing_modernity}/5)</span>
                </div>

                <div className="p-3 rounded-lg bg-blue-50">
                    <div className="flex items-center mb-1 text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" /> Central Location
                    </div>
                    <span className="text-gray-800 font-bold">
                        {college.centrality === 5 ? 'Very Central' : 
                         college.centrality >= 4 ? 'Central' : 
                         college.centrality >= 3 ? 'Mid-Campus' : 
                         'Peripheral'}
                    </span>
                    <span className="text-xs text-gray-500"> ({college.centrality}/5)</span>
                </div>
            </div>
        </div>
    );
};

const App = () => {
  // GE Rigor: Low weight = want easy GEs (inverse), High weight = don't care about GE difficulty
  const [geRigorWeight, setGeRigorWeight] = useState(5); 
  // Housing: Low weight = don't care if housing is old, High weight = want new housing
  const [housingWeight, setHousingWeight] = useState(5);
  // Centrality: Low weight = don't care about location, High weight = want central location
  const [centralityWeight, setCentralityWeight] = useState(5);
  // Theme Filter
  const [themeFilter, setThemeFilter] = useState('All');

  const themes = ['All', 'Academically Focused', 'Global/International', 'Flexible/Less GE', 'Modern/Innovative', 'Social Justice/Community'];

  const rankedColleges = useMemo(() => {
    // 1. Calculate Scores
    const scores = collegeData
      .map(college => {
        // GE Rigor (Inverse Score): We want a high score for colleges with LOW GE Rigor (easy GEs).
        // Max Rigor (5) maps to Inverse GE Score of 1. Min Rigor (1) maps to Inverse GE Score of 5.
        // Formula: Inverse GE Score = 6 - college.ge_rigor
        const inverseGEScore = 6 - college.ge_rigor; // Scale: Revelle (1) -> Muir/Warren (4)

        // Calculate weighted scores
        const weightedGE = inverseGEScore * geRigorWeight;
        const weightedHousing = college.housing_modernity * housingWeight;
        const weightedCentrality = college.centrality * centralityWeight;
        
        const totalScore = weightedGE + weightedHousing + weightedCentrality;

        // Collect all weights for display
        const totalWeights = {
            ge_rigor_weight: geRigorWeight,
            housing_weight: housingWeight,
            centrality_weight: centralityWeight,
            score: totalScore
        }

        return {
          ...college,
          totalScore: totalScore,
          displayScore: totalWeights,
          inverseGEScore: inverseGEScore
        };
      })
      // 2. Filter by Theme
      .filter(college => {
        if (themeFilter === 'All') return true;
        if (themeFilter === 'Academically Focused') return college.name === 'Revelle College';
        if (themeFilter === 'Global/International') return college.name === 'Eleanor Roosevelt College';
        if (themeFilter === 'Flexible/Less GE') return college.name === 'John Muir College' || college.name === 'Earl Warren College';
        if (themeFilter === 'Modern/Innovative') return college.name === 'Sixth College' || college.name === 'Seventh College';
        if (themeFilter === 'Social Justice/Community') return college.name === 'Thurgood Marshall College' || college.name === 'Eighth College';
        return true;
      })
      // 3. Rank by Score (Descending)
      .sort((a, b) => b.totalScore - a.totalScore);

    return scores;
  }, [geRigorWeight, housingWeight, centralityWeight, themeFilter]);

  return (
    <div className="min-h-screen bg-gray-50 font-[Inter] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-8 p-6 bg-blue-700 rounded-2xl shadow-xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            <Sliders className="inline-block w-8 h-8 mr-2" />
            UCSD College Preference Builder
          </h1>
          <p className="text-blue-200 text-sm sm:text-base">Rank the eight undergraduate colleges based on *your* priorities.</p>
        </header>

        {/* Filters and Sliders Section */}
        <section className="bg-white p-6 rounded-2xl shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-600" /> Adjust Your Priorities (Weights 1-10)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* GE Rigor Slider */}
            <SliderControl
              label="Easy GEs / Low Course Load"
              icon={BookOpen}
              value={geRigorWeight}
              onChange={setGeRigorWeight}
            />

            {/* Housing Modernity Slider */}
            <SliderControl
              label="Modern Housing / New Facilities"
              icon={Home}
              value={housingWeight}
              onChange={setHousingWeight}
            />

            {/* Centrality Slider */}
            <SliderControl
              label="Central Location / Proximity"
              icon={MapPin}
              value={centralityWeight}
              onChange={setCentralityWeight}
            />
          </div>

          {/* Theme Filter */}
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <label htmlFor="theme-filter" className="block text-sm font-medium text-gray-700 mb-2">
                <Compass className="inline-block w-4 h-4 mr-1 text-blue-600" /> Filter by Theme
            </label>
            <div className="relative">
                <select
                    id="theme-filter"
                    value={themeFilter}
                    onChange={(e) => setThemeFilter(e.target.value)}
                    className="appearance-none block w-full bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                >
                    {themes.map(theme => (
                        <option key={theme} value={theme}>{theme}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="w-4 h-4" />
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Filtering will only show colleges strongly aligned with the selected theme.</p>
          </div>
        </section>

        {/* Results Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-600" /> Your Personalized College Ranking ({rankedColleges.length} of 8 shown)
          </h2>
          {rankedColleges.length > 0 ? (
            rankedColleges.map((college, index) => (
              <CollegeCard
                key={college.name}
                college={college}
                rank={index + 1}
                totalScore={college.displayScore}
              />
            ))
          ) : (
            <div className="p-8 text-center bg-yellow-50 rounded-xl border border-yellow-200 text-yellow-700">
                No colleges match the current theme filter. Try selecting "All".
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
