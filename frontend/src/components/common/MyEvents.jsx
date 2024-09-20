import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MyEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();



    // Fetch user-specific events
    useEffect(() => {
        const fetchUserEvents = async () => {
            try {
                const token = localStorage.getItem('token'); // Get JWT token from localStorage
                const res = await axios.get('http://localhost:5000/api/events/user-events', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Pass the token to authenticate
                    }
                });
                setEvents(res.data); // Set the fetched events for the user
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch user events');
                setLoading(false);
            }
        };

        fetchUserEvents();
    }, []);
    const handleDelete = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setEvents(events.filter(event => event._id !== eventId)); // Remove deleted event from the list
                navigate('/my-event'); // Redirect to My Events page
            } catch (err) {
                console.error('Failed to delete event:', err);
            }
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
        <>
            <div className="main-page-wrapper">
                {/* <div id="preloader">
                    <div id="ctn-preloader" className="ctn-preloader">
                        <div className="icon"><img src="../images/loader.gif" alt className="m-auto d-block" width={64} /></div>
                    </div>
                </div> */}
                <aside className="dash-aside-navbar">
                    <div className="position-relative">
                        <div className="logo d-md-block d-flex align-items-center justify-content-between plr bottom-line pb-30">
                            <a href="/">
                                <img src="images/logo/logo_01.svg" alt />
                            </a>
                            <button className="close-btn d-block d-md-none"><i className="fa-light fa-circle-xmark" /></button>
                        </div>
                        <nav className="dasboard-main-nav pt-30 pb-30 bottom-line">
                            <ul className="style-none">
                                <li><div className="nav-title">Listing</div></li>
                                <li className="plr"><a href="/my-event" className="d-flex w-100 align-items-center">
                                    <img src="images/icon/icon_6.svg" alt />
                                    <span>My Events</span>
                                </a></li>
                                <li className="plr"><a href="/create-event" className="d-flex w-100 align-items-center active">
                                    <img src="images/icon/icon_7_active.svg" alt />
                                    <span>Add New Events</span>
                                </a></li>
                                <li className="plr"><a href="favourites.html" className="d-flex w-100 align-items-center">
                                    <img src="images/icon/icon_8.svg" alt />
                                    <span>Favourites</span>
                                </a></li>
                            </ul>
                        </nav>

                        {/* /.profile-complete-status */}
                        <div className="plr mt-30">
                            <a href="#" className="d-flex w-100 align-items-center logout-btn">
                                <div className="icon tran3s d-flex align-items-center justify-content-center rounded-circle"><img src="images/icon/icon_41.svg" alt /></div>
                                <span>Logout</span>
                            </a>
                        </div>
                    </div>
                </aside>
                <div className="dashboard-body">
                    <div className="position-relative">
                        {/* ************************ Header **************************** */}
                        <header className="dashboard-header">
                            <div className="d-flex align-items-center justify-content-end">
                                <h4 className="m0 d-none d-lg-block">My Events</h4>
                                {error && <p>{error}</p>}
                                <button className="dash-mobile-nav-toggler d-block d-md-none me-auto">
                                    <span />
                                </button>
                                <form action="#" className="search-form ms-auto">
                                    <input type="text" placeholder="Search here.." />
                                </form>
                                <div className="d-none d-md-block me-3 ms-3">
                                    <a href="add-property.html" className="btn-two"><span>Add Listing</span> <i className="fa-thin fa-arrow-up-right" /></a>
                                </div>
                            </div>
                        </header>
                        {/* End Header */}
                        <h2 className="main-title d-block d-lg-none">My Properties</h2>
                        <div className="d-sm-flex align-items-center justify-content-between mb-25">
                            <div className="fs-16">Showing <span className="color-dark fw-500">1–5</span> of <span className="color-dark fw-500">40</span> results</div>
                            <div className="d-flex ms-auto xs-mt-30">
                                <div className="short-filter d-flex align-items-center ms-sm-auto">
                                    <div className="fs-16 me-2">Short by:</div>
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
                        <div className="bg-white card-box p0 border-20">
                            <div className="table-responsive pt-25 pb-25 pe-4 ps-4">
                                <table className="table property-list-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title, Location & Date</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Seats</th>
                                            <th scope="col">Event Type</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-0 ">
                                        {events.map((event, index) => (
                                            <tr key={index}>
                                                <td className='w-25'>
                                                    <div className="d-lg-flex align-items-center position-relative">
                                                        <img src={`http://localhost:5000/${event.image}`} alt="event" className="p-img" />
                                                        <div className="ps-lg-4 md-pt-10">
                                                            <a href="#" className="property-name tran3s color-dark fw-500 fs-20 stretched-link">{event.title}</a>
                                                            <div className="address">{event.location}</div>
                                                            <h6>{new Date(event.date).toLocaleDateString()}</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className=' mytable'>{event.description}</td>
                                                <td>{event.maxAttendees}</td>
                                                <td><strong className="price color-dark">{event.eventType}</strong></td>
                                                <td>
                                                    <div className="action-dots float-end">
                                                        <button className="action-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <span />
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                            <li>
                                                                <Link className="dropdown-item" to={`/edit-event/${event._id}`}>
                                                                    <img src="images/icon/icon_20.svg" alt="edit" />Edit
                                                                </Link>
                                                            </li>
                                                            <li><a className="dropdown-item" onClick={() => handleDelete(event._id)}><img src="images/icon/icon_21.svg" alt="delete" />Delete</a></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* /.table property-list-table */}
                            </div>
                        </div>
                        {/* /.card-box */}
                        <ul className="pagination-one d-flex align-items-center justify-content-center style-none pt-40">
                            <li><a href="#">1</a></li>
                            <li className="active"><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li>....</li>
                            <li className="ms-2"><a href="#" className="d-flex align-items-center">Last <img src="../images/icon/icon_46.svg" alt className="ms-2" /></a></li>
                        </ul>
                    </div>
                </div>

                <button className="scroll-top">
                    <i className="bi bi-arrow-up-short" />
                </button>
            </div>


        </>
    )
}

export default MyEvents


