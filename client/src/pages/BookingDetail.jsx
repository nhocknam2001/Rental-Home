import { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);

  const { bookingId } = useParams();
  const [bookingDetail, setBookingDetail] = useState(null);

  const getBookingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/bookings/${bookingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setBookingDetail(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getBookingDetails();
  }, []);

  console.log(bookingDetail);

  const countDay = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dayCount = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
    return dayCount;
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />

      <div className="listing-details">
        <div className="title">
          <h1>{bookingDetail.listingId.title}</h1>
          <div></div>
        </div>

        <div className="photos">
          {bookingDetail.customerId.listingPhotoPaths?.map((item) => (
            <img
              style={{ objectFit: "cover", borderRadius: "50%" }}
              alt="booker"
              src={`http://localhost:3001/${item.replace("public", "")}`}
            />
          ))}
        </div>

        <h2>
          {bookingDetail.listingId.type} in {bookingDetail.listingId.city},{" "}
          {bookingDetail.listingId.province}, {bookingDetail.listingId.country}
        </h2>
        <p>
          {bookingDetail.listingId.guestCount} guests -{" "}
          {bookingDetail.listingId.bedroomCount} bedroom(s) -{" "}
          {bookingDetail.listingId.bedCount} bed(s) -{" "}
          {bookingDetail.listingId.bathroomCount} bathroom(s)
        </p>
        <hr />

        <div className="profile">
          <img
            style={{ objectFit: "cover", borderRadius: "50%" }}
            alt="booker"
            src={`http://localhost:3001/${bookingDetail.customerId.profileImagePath.replace(
              "public",
              ""
            )}`}
          />
          <h3>
            Booked by {bookingDetail.customerId.firstName}{" "}
            {bookingDetail.customerId.lastName}
          </h3>
        </div>
        <hr />

        <h3>Description</h3>
        <p>{bookingDetail.listingId.description}</p>
        <hr />

        <h3>{bookingDetail.listingId.highlight}</h3>
        <p>{bookingDetail.listingId.highlightDesc}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {bookingDetail.listingId.amenities[0]
                .split(",")
                .map((item, index) => (
                  <div className="facility" key={index}>
                    <div className="facility_icon">
                      {
                        facilities.find((facility) => facility.name === item)
                          ?.icon
                      }
                    </div>
                    <p>{item}</p>
                  </div>
                ))}
            </div>
          </div>

          <div style={{ paddingRight: "30px" }}>
            <h2>Rental Calender</h2>
            <div className="date-range-calendar">
              {countDay(bookingDetail.startDate, bookingDetail.endDate) > 1 ? (
                <h2>
                  ${bookingDetail.listingId.price} x{" "}
                  {countDay(bookingDetail.startDate, bookingDetail.endDate)}{" "}
                  nights
                </h2>
              ) : (
                <h2>
                  ${bookingDetail.listingId.price} x{" "}
                  {countDay(bookingDetail.startDate, bookingDetail.endDate)}{" "}
                  night
                </h2>
              )}

              <h2>Total price: ${bookingDetail.totalPrice}</h2>
              <p>Start Date: {bookingDetail.startDate}</p>
              <p>End Date: {bookingDetail.endDate}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ListingDetails;
