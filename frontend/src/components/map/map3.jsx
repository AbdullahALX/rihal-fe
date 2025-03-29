import React, { useState, useEffect, useRef } from 'react';
import Map, { Source, Layer, Marker, Popup } from 'react-map-gl/mapbox';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle,
  Search,
  ShieldCheck,
  Clock,
  Route,
  X,
  Eye,
  CalendarClock,
  CalendarDays,
  MapPinPlusInside,
  MapPinXInside,
} from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useTheme } from '@/components/theme-provider';

import { format } from 'date-fns';

import { Input } from '@/components/ui/input';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const defaultCenter = [57.9754, 22.4735];
const defaultZoom = 5.3;

// the cluster layers
const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'crimes',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': [
      'step',
      ['get', 'point_count'],
      '#32484d',
      10,
      '#3f655c',
      30,
      '#268273',
    ],
    'circle-radius': ['step', ['get', 'point_count'], 15, 5, 20, 20, 25],
  },
};

const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',

  source: 'crimes',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
  paint: {
    'text-color': '#fff',
  },
};

const unclusteredPointLayer = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'crimes',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#11b4da',
    'circle-radius': 8,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#f2f0f0',
  },
};

const statusIcons = {
  Resolved: <CheckCircle className="w-5 h-5 text-green-500" />,
  'Under Investigation': <Search className="w-5 h-5 text-yellow-500" />,
  'On Scene': <ShieldCheck className="w-5 h-5 text-blue-500" />,
  Pending: <Clock className="w-5 h-5 text-gray-500" />,
  'En Route': <Route className="w-5 h-5 text-orange-500" />,
};

//Custom Parser
const parseCustomDate = (dateString) => {
  const parts = dateString.split('-');

  // make sure there are at least 5 parts (year, month, day, hour, minute)
  if (parts.length === 5) {
    const [year, month, day, hour, minute] = parts;

    const isoDate = `${year}-${month}-${day}T${hour}:${minute}:00`;

    // Create a Date object
    const dateObj = new Date(isoDate);

    // Check if the date is valid
    if (isNaN(dateObj)) {
      console.error('Invalid date:', isoDate);
      return null;
    }

    return dateObj;
  } else {
    console.error('Invalid date format:', dateString);
    return null; // Return null for invalid input format
  }
};

const TheMap = () => {
  const { theme } = useTheme();
  const mapRef = useRef(null);

  const [crimeData, setCrimeData] = useState(null);
  const [selectedCrime, setSelectedCrime] = useState(null);
  const [hide, setHide] = useState(false);

  const [selectedRange, setSelectedRange] = useState('');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [showLocation, setShowLocation] = useState(true); // New state for showing location

  // for filters
  const [selectedCrimeType, setSelectedCrimeType] = useState('all');
  const [selectedReportStatus, setSelectedReportStatus] = useState('all');
  const [filteredCrimeData, setFilteredCrimeData] = useState(null);

  const loadUserLocation = () => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData?.location) {
      setUserLocation(storedUserData.location);
    }
  };

  const toggleLocationVisibility = () => {
    if (userLocation) {
      setUserLocation(null); // Clear location if it is already set
    } else {
      loadUserLocation(); // Load user location if not set
    }
  };

  useEffect(() => {
    fetch('/filtered_crimes_2.json')
      .then((res) => res.json())
      .then((data) => {
        const geoJson = {
          type: 'FeatureCollection',
          features: data.crimes.map((crime) => ({
            type: 'Feature',
            properties: {
              id: crime.id,
              crime_type: crime.crime_type,
              report_details: crime.report_details,
              report_status: crime.report_status,
              report_date_time: crime.report_date_time,
            },
            geometry: {
              type: 'Point',
              coordinates: [crime.longitude, crime.latitude],
            },
          })),
        };
        setCrimeData(geoJson);
      })
      .catch((err) => console.error('Error loading crime data:', err));

    if (mapRef.current) {
      mapRef.current.jumpTo({
        center: defaultCenter,
        zoom: defaultZoom,
      });
    }
  }, []);

  // Handle when a user clicks on a crime or a cluster
  const handleMapClick = (event) => {
    const features = event.target.queryRenderedFeatures(event.point);

    if (features.length > 0) {
      const feature = features.find((f) => f.layer.id === 'unclustered-point');

      if (feature) {
        setSelectedCrime(feature);
      }
    }
  };

  // here the logic for filtersss
  useEffect(() => {
    if (!crimeData) return;

    const filteredFeatures = crimeData.features.filter((crime) => {
      const crimeType = crime.properties.crime_type.toLowerCase();
      const selectedType = selectedCrimeType.toLowerCase();

      const matchesCrimeType =
        selectedCrimeType === 'all' || crimeType === selectedType;

      const crimeStatus = crime.properties.report_status.toLowerCase();
      const selectedStatus = selectedReportStatus.toLowerCase();

      const matchesReportStatus =
        selectedReportStatus === 'all' || crimeStatus === selectedStatus;

      // Use the parseCustomDate
      const crimeDate = parseCustomDate(crime.properties.report_date_time);

      const matchesDateRange =
        selectedRange === 'all-time' ||
        selectedRange === '' ||
        (selectedRange === '24-hours' &&
          crimeDate >= new Date(Date.now() - 24 * 60 * 60 * 1000)) ||
        (selectedRange === '7-days' &&
          crimeDate >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
        (selectedRange === '30-days' &&
          crimeDate >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
        (selectedRange === 'custom' &&
          customStartDate &&
          customEndDate &&
          crimeDate >= new Date(customStartDate) &&
          crimeDate <= new Date(customEndDate));

      return matchesCrimeType && matchesReportStatus && matchesDateRange;
    });

    setFilteredCrimeData({
      type: 'FeatureCollection',
      features: filteredFeatures,
    });
  }, [
    crimeData,
    selectedCrimeType,
    selectedReportStatus,
    selectedRange,
    customStartDate,
    customEndDate,
  ]);

  // Function to reset all filters
  const resetFilters = () => {
    setSelectedCrimeType('all');
    setSelectedReportStatus('all');
    setSelectedRange('');
    setCustomStartDate('');
    setCustomEndDate('');
    setFilteredCrimeData(crimeData); // Reset to all crime data
    if (mapRef.current) {
      mapRef.current.jumpTo({
        center: defaultCenter,
        zoom: defaultZoom,
      });
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col overflow-hidden">
      <div className="w-full flex m-4 gap-3 overflow-x-auto overflow-y-hidden ">
        <Button
          className="text-muted-foreground rounded-md mb-2"
          variant="outline"
          onClick={toggleLocationVisibility}
        >
          {userLocation ? (
            <MapPinXInside className="w-8 h-8 text-green-700" /> // Show location
          ) : (
            <MapPinPlusInside className="w-8 h-8 text-foreground-600" /> // Hide location
          )}
        </Button>
        <Select
          onValueChange={(value) => setSelectedCrimeType(value)}
          value={selectedCrimeType}
        >
          <SelectTrigger className="w-[180px] rounded-md text-muted-foreground  ">
            <SelectValue placeholder="Crime Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Crimes</SelectItem>
            <SelectItem value="burglary">Burglary</SelectItem>
            <SelectItem value="theft">Theft</SelectItem>
            <SelectItem value="homicide">Homicide</SelectItem>
            <SelectItem value="robbery">Robbery</SelectItem>
            <SelectItem value="kidnapping">Kidnapping</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={setSelectedReportStatus}
          value={selectedReportStatus}
        >
          <SelectTrigger className="w-[200px] text-muted-foreground ">
            <SelectValue placeholder="Report Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="under investigation">
              Under Investigation
            </SelectItem>
            <SelectItem value="on scene">On Scene</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="en route">En Route</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => setSelectedRange(value)}
          value={selectedRange}
        >
          <SelectTrigger className="w-[80px] rounded-md text-muted-foreground  ">
            <CalendarDays width={20} color="gray" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-time">All Time</SelectItem>
            <SelectItem value="24-hours">Last 24 Hours</SelectItem>
            <SelectItem value="7-days">Last 7 Days</SelectItem>
            <SelectItem value="30-days">Last 30 Days</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>

        {selectedRange === 'custom' && (
          <div className="flex space-x-3">
            <Input
              className="rounded-md text-muted-foreground"
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              placeholder="Start Date"
            />
            <span className="text-sm font-thin mt-3 ">to</span>
            <Input
              className="rounded-md  text-muted-foreground"
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              placeholder="End Date"
            />
          </div>
        )}

        <Button
          className="text-muted-foreground rounded-md mb-2"
          variant="outline"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </div>
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: defaultCenter[0],
          latitude: defaultCenter[1],
          zoom: defaultZoom,
          // bearing: 0,
          // pitch: 60,
        }}
        style={{ width: '100%', height: '100%', borderRadius: '6px' }}
        mapStyle={
          theme === 'dark'
            ? 'mapbox://styles/mapbox/navigation-night-v1'
            : 'mapbox://styles/mapbox/navigation-day-v1'
        }
        onClick={handleMapClick}
      >
        {userLocation && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <Marker
                longitude={userLocation.longitude}
                latitude={userLocation.latitude}
              >
                <TooltipTrigger asChild>
                  <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white animate-bounce" />
                </TooltipTrigger>
                <TooltipContent className="font-normal">
                  Your location
                </TooltipContent>
              </Marker>
            </Tooltip>
          </TooltipProvider>
        )}

        {filteredCrimeData && (
          <Source
            id="crimes"
            type="geojson"
            data={filteredCrimeData}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unclusteredPointLayer} />
          </Source>
        )}

        {selectedCrime && !hide && (
          <Card className="w-[300px] items-center rounded-md absolute bottom-10 p-6 shadow-lg ">
            <div>
              <div className="space-y-1">
                <h4 className="text-lg font-semibold w-full flex flex-row justify-between">
                  {selectedCrime.properties.crime_type}
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a variant="ghost">
                          {statusIcons[selectedCrime.properties.report_status]}
                        </a>
                      </TooltipTrigger>
                      <TooltipContent className="font-normal">
                        {selectedCrime.properties.report_status}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </h4>
                <p className="text-[14px] text-muted-foreground py-1">
                  {selectedCrime.properties.report_details}
                </p>
                <span className=" text-left font-normal  text-muted-foreground flex flex-row justify-between  ">
                  {selectedCrime.properties.report_date_time
                    ? format(
                        parseCustomDate(
                          selectedCrime.properties.report_date_time
                        ),
                        'PPP p'
                      )
                    : 'none'}
                  <CalendarClock className="w-4 h-4 text-gray-500" />
                </span>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center space-x-6">
                <Button
                  variant="ghost"
                  className="font-light tracking-wider flex items-center"
                  onClick={() => setSelectedCrime(null)}
                >
                  <X className="w-4 h-4 mr-1" /> Close
                </Button>
                <Separator orientation="vertical" />
                <Button
                  variant="ghost"
                  className="font-light tracking-wider flex items-center"
                  onClick={() => setHide(true)}
                >
                  <Eye className="w-4 h-4 mr-1" /> Hide
                </Button>
              </div>
            </div>
          </Card>
        )}

        {hide && (
          <button
            className="absolute bottom-10 left-10 bg-foreground-100 shadow-md p-3 rounded-full flex items-center"
            onClick={() => setHide(false)}
          >
            <Eye className="w-6 h-6 text-foreground-600" />
          </button>
        )}
      </Map>
    </div>
  );
};

export default TheMap;
