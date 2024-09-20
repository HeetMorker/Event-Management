// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Tooltip from '@mui/material/Tooltip'; // Import Material-UI Tooltip for nice tooltips
// import { AuthContext } from '../context/AuthContext'; // Adjust the path based on your project structure
// import { useContext } from 'react';

// const Index = () => {
//   const { user } = useContext(AuthContext);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [rsvpStatus, setRsvpStatus] = useState({}); // Store RSVP statuses (success/error) for each event

//   const [tooltipMessage, setTooltipMessage] = useState(null); // Tooltip message for success or error
//   const [tooltipType, setTooltipType] = useState(''); // Tooltip color (success/error)

//   // Fetch events from backend
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/events');
//         setEvents(res.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load events');
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   // Handle RSVP for an event
//   const handleRSVP = async (eventId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.post(`http://localhost:5000/api/events/${eventId}/rsvp`, {}, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       setTooltipMessage(res.data.message); // Success message
//       setTooltipType('success'); // Tooltip color green
//       setRsvpStatus((prev) => ({
//         ...prev,
//         [eventId]: 'RSVP_SUCCESS' // Mark RSVP as successful
//       }));

//       setTimeout(() => setTooltipMessage(null), 3000); // Hide the tooltip after 3 seconds
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Failed to RSVP';
//       setTooltipMessage(errorMessage); // Error message
//       setTooltipType('error'); // Tooltip color red
//       setRsvpStatus((prev) => ({
//         ...prev,
//         [eventId]: 'RSVP_ERROR' // Mark RSVP as failed
//       }));

//       setTimeout(() => setTooltipMessage(null), 3000); // Hide the tooltip after 3 seconds
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <>
//       <div className="property-listing-six bg-pink-two pt-110 md-pt-80 pb-170 xl-pb-120 mt-150 xl-mt-120">
//         <div className="container">
//           <div className="search-wrapper-one layout-one bg position-relative mb-75 md-mb-50">
//             <div className="bg-wrapper border-layout">
//               <form action="#">
//                 <div className="row gx-0 align-items-center">
//                   <div className="col-xl-3 col-lg-4">
//                     <div className="input-box-one border-left">
//                       <div className="label">I’m looking to...</div>
//                       <select className="nice-select border-0"  >
//                         <option value="">Select Event Type</option>
//                         <option value="conference">Networking events</option>
//                         <option value="conference">Charity events</option>
//                         <option value="conference">Social events</option>
//                         <option value="conference">Conference</option>
//                         <option value="workshop">Workshop</option>
//                         <option value="meetup">Meetup</option>
//                         <option value="meetup">Seminars</option>
//                       </select>
//                     </div>
//                     {/* /.input-box-one */}
//                   </div>
//                   <div className="col-xl-3 col-lg-4">
//                     <div className="input-box-one border-left">
//                       <div className="label">Location</div>
//                       <select className="nice-select location border-0" >
//                         <option >Select Location</option>
//                         <option >Gujrat, Ahemdabad</option>
//                         <option >Delhi</option>
//                         <option >New Mumbai</option>
//                         <option >Karnataka</option>
//                         <option >Pune</option>
//                         <option >Patna </option>
//                         <option >Gandhinagar</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-xl-3 col-lg-4">
//                     <div className="input-box-one  border-left border-lg-0">
//                       <div className="label">On Date</div>
//                       <input type="date" className='border-0 text-center' />
//                     </div>
//                   </div>
//                   <div className="col-xl-3">
//                     <div className="input-box-one lg-mt-20">
//                       <div className="d-flex align-items-center">
//                         <button className="fw-500 text-uppercase tran3s search-btn">Search</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//           {/* /.search-wrapper-one */}
//           <div className="listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30">
//             <div>Showing <span className="color-dark fw-500">{events.length}</span> results</div>
//             <div className="d-flex align-items-center xs-mt-20">
//               <div className="short-filter d-flex align-items-center">
//                 <div className="fs-16 me-2">Short by:</div>
//                 <select className="nice-select" style={{ display: 'none' }}>
//                   <option value={0}>Newest</option>
//                   <option value={1}>Best Seller</option>
//                   <option value={2}>Best Match</option>
//                   <option value={3}>Price Low</option>
//                   <option value={4}>Price High</option>
//                 </select><div className="nice-select" tabIndex={0}><span className="current">Newest</span><ul className="list"><li data-value={0} className="option selected">Newest</li><li data-value={1} className="option">Best Seller</li><li data-value={2} className="option">Best Match</li><li data-value={3} className="option">Price Low</li><li data-value={4} className="option">Price High</li></ul></div>
//               </div>
//               <a href="listing_04.html" className="tran3s layout-change rounded-circle ms-auto ms-sm-3" data-bs-toggle="tooltip" aria-label="Switch To List View" data-bs-original-title="Switch To List View"><i className="fa-regular fa-bars" /></a>
//             </div>
//           </div>
//           {/* /.listing-header-filter */}
//           <div className="row gx-xxl-5">
//             {events.map((event, index) => (
//               <div className="col-lg-4 col-md-6 d-flex mb-50" key={index}>
//                 <div className="listing-card-one border-25 h-100 w-100">
//                   <div className="img-gallery p-15">
//                     <div className="position-relative border-25 overflow-hidden">
//                       <div className="tag border-25">{event.eventType}</div>
//                       <div className="carousel slide">
//                         <div className="carousel-inner">
//                           <div className="carousel-item active">
//                             <a href="#" className="d-block">
//                               <img src={`http://localhost:5000/${event.image}`} className="w-100" alt={event.title} />
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="property-info p-25">
//                     <a href="#" className="title tran3s">{event.title}</a>
//                     <div className="address d-flex justify-content-between">
//                       <div className="location">{event.location}</div>
//                       <span className="current">Seats: {event.maxAttendees}</span>

//                     </div>

//                     <div className="description">
//                       <p>{event.description}</p>
//                     </div>
//                     <div className="pl-footer top-border d-flex align-items-center justify-content-between">
//                       <strong className="fs-6 fw-500 color-dark">On: {new Date(event.date).toLocaleDateString()}</strong>
//                        {event.rsvpList && event.rsvpList.includes(user._id) ? (
//                       <Tooltip title="You have RSVP'd for this event" arrow>
//                         <button className="btn btn-disabled" disabled>RSVP'd</button>
//                       </Tooltip>
//                     ) : event.rsvpList && event.rsvpList.length >= event.maxAttendees ? (
//                       <Tooltip title="RSVP Full" arrow>
//                         <button className="btn btn-disabled" disabled>RSVP Full</button>
//                       </Tooltip>
//                     ) : (
//                       <Tooltip title={tooltipMessage || 'Click to RSVP'} placement="top" arrow 
//                         style={{
//                           backgroundColor: tooltipType === 'success' ? 'green' : 'red'
//                         }}
//                       >
//                         <button className="btn-10 rounded-0" onClick={() => handleRSVP(event._id)}>RSVP</button>
//                       </Tooltip>
//                     )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="pt-50 md-pt-20 text-center">
//             <ul class="pagination-one d-flex align-items-center justify-content-center style-none pt-40">
//               <li className='active'><a href="#" >1</a></li>
//               <li class=""><a href="#">2</a></li>
//               <li><a href="#">3</a></li>
//               <li><a href="#">4</a></li>
//               <li>....</li>
//               <li class="ms-2"><a href="#" class="d-flex align-items-center">Last <img src="../images/icon/icon_46.svg" alt="" class="ms-2" /></a></li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="fancy-banner-two position-relative z-1 pt-90 lg-pt-50 pb-90 lg-pb-50">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-lg-6">
//               <div className="title-one text-center text-lg-start md-mb-40 pe-xl-5">
//                 <h3 className="text-white m0">Start your <span>Journey<img src="images/lazy.svg" data-src="images/shape/title_shape_06.svg" alt className="lazy-img" /></span> As a Event Organiser.</h3>
//               </div>
//               {/* /.title-one */}
//             </div>
//             <div className="col-lg-6">
//               <div className="form-wrapper me-auto ms-auto me-lg-0">
//                 <form action="#">
//                   <input type="email" placeholder="Email address" className="rounded-0" />
//                   <button className="rounded-0">Get Started</button>
//                 </form>
//                 <div className="fs-16 mt-10 text-white">Already a Organiser? <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Sign in.</a></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Index


// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import Tooltip from '@mui/material/Tooltip';
// import { AuthContext } from '../context/AuthContext';
// import {jwtDecode} from 'jwt-decode';

// const Index = () => {
//   const { auth } = useContext(AuthContext); // Get the token from context
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [rsvpStatus, setRsvpStatus] = useState({});
//   const [tooltipMessage, setTooltipMessage] = useState(null);
//   const [tooltipType, setTooltipType] = useState('');

//   let user = null;

//   if (auth) {
//     user = jwtDecode(auth); // Decode the JWT token to get user info (like user._id)
//   }

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/events');
//         setEvents(res.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load events');
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const handleRSVP = async (eventId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.post(
//         `http://localhost:5000/api/events/${eventId}/rsvp`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setTooltipMessage(res.data.message); // Success message
//       setTooltipType('success'); // Tooltip color green
//       setRsvpStatus((prev) => ({
//         ...prev,
//         [eventId]: 'RSVP_SUCCESS', // Mark RSVP as successful
//       }));

//       setTimeout(() => setTooltipMessage(null), 3000); // Hide the tooltip after 3 seconds
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Failed to RSVP';
//       setTooltipMessage(errorMessage); // Error message
//       setTooltipType('error'); // Tooltip color red
//       setRsvpStatus((prev) => ({
//         ...prev,
//         [eventId]: 'RSVP_ERROR', // Mark RSVP as failed
//       }));

//       setTimeout(() => setTooltipMessage(null), 3000); // Hide the tooltip after 3 seconds
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <>
//       <div className="property-listing-six bg-pink-two pt-110 md-pt-80 pb-170 xl-pb-120 mt-150 xl-mt-120">
//         <div className="container">
//           <div className="search-wrapper-one layout-one bg position-relative mb-75 md-mb-50">
//             <div className="bg-wrapper border-layout">
//               <form action="#">
//                 <div className="row gx-0 align-items-center">
//                   <div className="col-xl-3 col-lg-4">
//                     <div className="input-box-one border-left">
//                       <div className="label">I’m looking to...</div>
//                       <select className="nice-select border-0">
//                         <option value="">Select Event Type</option>
//                         <option value="networking">Networking events</option>
//                         <option value="charity">Charity events</option>
//                         <option value="social">Social events</option>
//                         <option value="conference">Conference</option>
//                         <option value="workshop">Workshop</option>
//                         <option value="meetup">Meetup</option>
//                         <option value="seminar">Seminars</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-xl-3 col-lg-4">
//                     <div className="input-box-one border-left">
//                       <div className="label">Location</div>
//                       <select className="nice-select location border-0">
//                         <option>Select Location</option>
//                         <option>Gujrat, Ahemdabad</option>
//                         <option>Delhi</option>
//                         <option>New Mumbai</option>
//                         <option>Karnataka</option>
//                         <option>Pune</option>
//                         <option>Patna</option>
//                         <option>Gandhinagar</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-xl-3 col-lg-4">
//                     <div className="input-box-one border-left border-lg-0">
//                       <div className="label">On Date</div>
//                       <input type="date" className="border-0 text-center" />
//                     </div>
//                   </div>
//                   <div className="col-xl-3">
//                     <div className="input-box-one lg-mt-20">
//                       <div className="d-flex align-items-center">
//                         <button className="fw-500 text-uppercase tran3s search-btn">
//                           Search
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>

//           <div className="listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30">
//             <div>Showing <span className="color-dark fw-500">{events.length}</span> results</div>
//             <div className="d-flex align-items-center xs-mt-20">
//               <div className="short-filter d-flex align-items-center">
//                 <div className="fs-16 me-2">Short by:</div>
//                 <select className="nice-select">
//                   <option value={0}>Newest</option>
//                   <option value={1}>Best Seller</option>
//                   <option value={2}>Best Match</option>
//                   <option value={3}>Price Low</option>
//                   <option value={4}>Price High</option>
//                 </select>
//               </div>
//               <a href="listing_04.html" className="tran3s layout-change rounded-circle ms-auto ms-sm-3">
//                 <i className="fa-regular fa-bars" />
//               </a>
//             </div>
//           </div>

//           <div className="row gx-xxl-5">
//             {events.map((event, index) => (
//               <div className="col-lg-4 col-md-6 d-flex mb-50" key={index}>
//                 <div className="listing-card-one border-25 h-100 w-100">
//                   <div className="img-gallery p-15">
//                     <div className="position-relative border-25 overflow-hidden">
//                       <div className="tag border-25">{event.eventType}</div>
//                       <div className="carousel slide">
//                         <div className="carousel-inner">
//                           <div className="carousel-item active">
//                             <a href="#" className="d-block">
//                               <img src={`http://localhost:5000/${event.image}`} className="w-100" alt={event.title} />
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="property-info p-25">
//                     <a href="#" className="title tran3s">{event.title}</a>
//                     <div className="address d-flex justify-content-between">
//                       <div className="location">{event.location}</div>
//                       <span className="current">Seats: {event.maxAttendees}</span>
//                     </div>

//                     <div className="description">
//                       <p>{event.description}</p>
//                     </div>
//                     <div className="pl-footer top-border d-flex align-items-center justify-content-between">
//                       <strong className="fs-6 fw-500 color-dark">On: {new Date(event.date).toLocaleDateString()}</strong>

//                       {event.rsvpList && user && event.rsvpList.includes(user._id) ? (
//                         <Tooltip title="You have RSVP'd for this event" arrow>
//                           <button className="btn btn-disabled" disabled>RSVP'd</button>
//                         </Tooltip>
//                       ) : event.rsvpList && event.rsvpList.length >= event.maxAttendees ? (
//                         <Tooltip title="RSVP Full" arrow>
//                           <button className="btn btn-disabled" disabled>RSVP Full</button>
//                         </Tooltip>
//                       ) : (
//                         <Tooltip title={tooltipMessage || 'Click to Reserve Spot'} placement="top" arrow>
//                           <button className="btn-10 rounded-0" onClick={() => handleRSVP(event._id)}>RSVP</button>
//                         </Tooltip>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="pt-50 md-pt-20 text-center">
//             <ul className="pagination-one d-flex align-items-center justify-content-center style-none pt-40">
//               <li className="active"><a href="#">1</a></li>
//               <li><a href="#">2</a></li>
//               <li><a href="#">3</a></li>
//               <li><a href="#">4</a></li>
//               <li>....</li>
//               <li className="ms-2"><a href="#" className="d-flex align-items-center">Last <img src="../images/icon/icon_46.svg" alt="" className="ms-2" /></a></li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="fancy-banner-two position-relative z-1 pt-90 lg-pt-50 pb-90 lg-pb-50">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-lg-6">
//               <div className="title-one text-center text-lg-start md-mb-40 pe-xl-5">
//                 <h3 className="text-white m0">Start your <span>Journey<img src="images/lazy.svg" data-src="images/shape/title_shape_06.svg" alt="" className="lazy-img" /></span> As an Event Organiser.</h3>
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="form-wrapper me-auto ms-auto me-lg-0">
//                 <form action="#">
//                   <input type="email" placeholder="Email address" className="rounded-0" />
//                   <button className="rounded-0">Get Started</button>
//                 </form>
//                 <div className="fs-16 mt-10 text-white">Already an Organiser? <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Sign in.</a></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Index;

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import { AuthContext } from '../context/AuthContext';

const Index = () => {
  const { auth } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]); // State to hold filtered events
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tooltipMessage, setTooltipMessage] = useState(null);
  const [tooltipType, setTooltipType] = useState('');

  // Filter state
  const [eventType, setEventType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data);
        setFilteredEvents(res.data); // Initialize filtered events with all events
        setLoading(false);
      } catch (err) {
        setError('Failed to load events');
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Filter events based on filter state
  useEffect(() => {
    let filtered = events;

    // Apply event type filter
    if (eventType) {
      filtered = filtered.filter((event) => event.eventType === eventType);
    }

    // Apply location filter
    if (location && location !== 'Select Location') {
      filtered = filtered.filter((event) => event.location === location);
    }

    // Apply date filter
    if (date) {
      filtered = filtered.filter((event) => new Date(event.date).toLocaleDateString() === new Date(date).toLocaleDateString());
    }

    setFilteredEvents(filtered); // Update the filtered events
  }, [eventType, location, date, events]); // Run effect when any filter or events change

  // Function to handle RSVP
  const handleRSVP = async (eventId) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const res = await axios.post(
        `http://localhost:5000/api/events/${eventId}/rsvp`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTooltipMessage(res.data.message); // Success message
      setTooltipType('success'); // Tooltip color green
      setTimeout(() => setTooltipMessage(null), 3000); // Hide tooltip after 3 seconds
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to RSVP';
      setTooltipMessage(errorMessage); // Error message
      setTooltipType('error'); // Tooltip color red
      setTimeout(() => setTooltipMessage(null), 3000); // Hide tooltip after 3 seconds
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="property-listing-six bg-pink-two pt-110 md-pt-80 pb-170 xl-pb-120 mt-150 xl-mt-120">
        <div className="container">
          <div className="search-wrapper-one layout-one bg position-relative mb-75 md-mb-50">
            <div className="bg-wrapper border-layout">
              <form>
                <div className="row gx-0 align-items-center">
                  <div className=" col-lg-4">
                    <div className="input-box-one border-left">
                      <div className="label">I’m looking to...</div>
                      <select className="nice-select border-0" value={eventType} onChange={(e) => setEventType(e.target.value)}>
                        <option value="">Select Event Type</option>
                        <option value="networking">Networking events</option>
                        <option value="charity">Charity events</option>
                        <option value="social">Social events</option>
                        <option value="conference">Conference</option>
                        <option value="workshop">Workshop</option>
                        <option value="meetup">Meetup</option>
                        <option value="seminar">Seminars</option>
                      </select>
                    </div>
                  </div>
                  <div className=" col-lg-4">
                    <div className="input-box-one border-left">
                      <div className="label">Location</div>
                      <select className="nice-select location border-0" value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option>Select Location</option>
                        <option value="ahemdabad">Ahemdabad</option>
                        <option value="delhi">Delhi</option>
                        <option value="mumbai">New Mumbai</option>
                        <option value="karnataka">Karnataka</option>
                        <option value="pune">Pune</option>
                        <option value="patna">Patna</option>
                        <option value="gandhinagar">Gandhinagar</option>
                      </select>
                    </div>
                  </div>
                  <div className=" col-lg-4">
                    <div className="input-box-one border-left border-lg-0">
                      <div className="label">On Date</div>
                      <input type="date" className="border-0 text-center" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30">
            <div>Showing <span className="color-dark fw-500">{filteredEvents.length}</span> results</div>
            <div className="d-flex align-items-center xs-mt-20">
              <div className="short-filter d-flex align-items-center">
                <div className="fs-16 me-2">Sort by:</div>
                <select className="nice-select">
                  <option value={0}>Newest</option>
                  <option value={1}>Best Seller</option>
                  <option value={2}>Best Match</option>
                  <option value={3}>Price Low</option>
                  <option value={4}>Price High</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row gx-xxl-5">
            {filteredEvents.map((event, index) => (
              <div className="col-lg-4 col-md-6 d-flex mb-50" key={index}>
                <div className="listing-card-one border-25 h-100 w-100">
                  <div className="img-gallery p-15">
                    <div className="position-relative border-25 overflow-hidden">
                      <div className="tag border-25">{event.eventType}</div>
                      <div className="carousel slide">
                        <div className="carousel-inner">
                          <div className="carousel-item active">
                            <a href="#" className="d-block">
                              <img src={`http://localhost:5000/${event.image}`} className="w-100" alt={event.title} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="property-info p-25">
                    <a href="#" className="title tran3s">{event.title}</a>
                    <div className="address d-flex justify-content-between">
                      <div className="location">{event.location}</div>
                      <span className="current">Seats: {event.maxAttendees}</span>
                    </div>

                    <div className="description">
                      <p>{event.description}</p>
                    </div>
                    <div className="pl-footer top-border d-flex align-items-center justify-content-between">
                      <strong className="fs-6 fw-500 color-dark">On: {new Date(event.date).toLocaleDateString()}</strong>

                      {event.rsvpList && auth && event.rsvpList.includes(auth._id) ? (
                        <Tooltip title="You have RSVP'd for this event" arrow>
                          <button className="btn btn-disabled" disabled>RSVP'd</button>
                        </Tooltip>
                      ) : event.rsvpList && event.rsvpList.length >= event.maxAttendees ? (
                        <Tooltip title="RSVP Full" arrow>
                          <button className="btn btn-disabled" disabled>RSVP Full</button>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Click to RSVP" placement="top" arrow>
                          <button className="btn-10 rounded-0" onClick={() => handleRSVP(event._id)}>RSVP</button>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
