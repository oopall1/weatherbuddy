import {
  useEffect,
  useRef,
  type Dispatch,
  type FC,
  type FormEvent,
  type SetStateAction,
} from "react";
import { Search, LocateFixed, X } from "lucide-react";

import { useCities } from "../common/hooks/queries";
import type { City } from "../common/interfaces";

type WeatherQuery = { lat: number; lon: number } | string;

interface SearchBarProps {
  cityInput: string;
  setCityInput: Dispatch<SetStateAction<string>>;
  handleFetchWeather: (query: WeatherQuery) => void;
  onGeolocationRequest: () => void;
}

const SearchBar: FC<SearchBarProps> = ({
  cityInput,
  setCityInput,
  handleFetchWeather,
  onGeolocationRequest,
}) => {
  const wrapperRef = useRef<HTMLFormElement>(null);
  const { data: citiesSuggestions } = useCities(cityInput);

  // Handle clicks outside the suggestion box
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setCityInput("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setCityInput, wrapperRef]);

  const handleManualSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cityInput.trim()) {
      handleFetchWeather(cityInput.trim());
      clearInput();
    }
  };

  const selectSuggestion = (suggestion: City) => {
    handleFetchWeather({
      lat: Number(suggestion.lat),
      lon: Number(suggestion.lon),
    });
    clearInput();
  };

  const clearInput = () => {
    setCityInput("");
  };

  return (
    <form
      onSubmit={handleManualSearch}
      className="w-full max-w-lg relative"
      ref={wrapperRef}
    >
      <div className="flex rounded-full shadow-xl overflow-hidden bg-white/95 relative z-10">
        <input
          type="text"
          placeholder="Enter City Name or use Geolocation"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          className="grow p-4 text-gray-700 focus:outline-none placeholder-gray-400 pl-6"
        />

        {/* Clear Input Button */}
        {cityInput && (
          <button
            type="button"
            onClick={clearInput}
            className="p-4 text-gray-500 hover:text-gray-700 transition duration-300"
            aria-label="Clear search input"
          >
            <X size={20} />
          </button>
        )}

        {/* Search Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 transition duration-300 flex items-center justify-center space-x-2 disabled:bg-gray-400"
          disabled={!cityInput.trim()}
        >
          <Search size={20} />
          <span>Search</span>
        </button>

        {/* Geolocation Button */}
        <button
          type="button"
          onClick={onGeolocationRequest}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 transition duration-300 flex items-center justify-center space-x-2 disabled:bg-gray-400"
          aria-label="Use current location"
        >
          <LocateFixed size={20} />
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {citiesSuggestions &&
        cityInput.trim() &&
        citiesSuggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-2xl z-20 overflow-hidden">
            {citiesSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-3 text-gray-800 cursor-pointer hover:bg-indigo-100 transition duration-150 border-b border-gray-100 last:border-b-0"
                onClick={() => selectSuggestion(suggestion)}
              >
                {suggestion.city}, {suggestion.country}
              </li>
            ))}
          </ul>
        )}
    </form>
  );
};

export default SearchBar;
