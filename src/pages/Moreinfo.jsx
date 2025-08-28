import React, { use, useState } from 'react';
import '../components/cssFiles/Moreinfo.scss'
import DashboardHeader from '../components/DashboardHeader';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { getSoilInputsInfo } from '../api/predictapi';
import SearchBar from '../components/searchBar/SearchBar';

const MoreInfo = ({ user }) => {
  const [soilInputs, setSoilInputs] = useState([]); // full list
  const [filteredSoilInputs, setFilteredSoilInputs] = useState([]); // displayed list

  useEffect(() => {
    const fetchSoilInputs = async () => {
      const response = await getSoilInputsInfo();
      setSoilInputs(response);
      setFilteredSoilInputs(response); // show all initially
    };
    fetchSoilInputs();
  }, []);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredSoilInputs(soilInputs); // ✅ reset to full list
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = soilInputs.filter(input =>
        input.name.toLowerCase().includes(lowerCaseQuery) ||
        input.description.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredSoilInputs(filtered);
    }
  };


  return (
    <>
      <DashboardHeader user={user} />
      <div className="container" style={{ marginTop: "4.5rem" }}>
        <h2 className="text-start" >|Soil Inputs Info</h2>
        <SearchBar onSearch={handleSearch} />
        <section className="light">
          <div className="container">
            {filteredSoilInputs.map((nutrient, index) => (
              <article key={index} className="postcard light blue">

                {/* Image */}
                <a className="postcard__img_link" href="#">
                  <img
                    className="postcard__img"
                    src={nutrient.image_url}
                    alt={nutrient.name}
                  />
                </a>

                {/* Text Content */}
                <div className="postcard__text t-dark">
                  <h1 className="postcard__title blue">
                    <a href="#">{nutrient.name}</a>
                  </h1>

                  <div className="postcard__subtitle small">
                    <time dateTime="2020-05-25 12:00:00">
                      <i className="fas fa-calendar-alt mr-2"></i>
                      {nutrient.intro}
                    </time>
                  </div>

                  <div className="postcard__bar"></div>

                  <div className="postcard__preview-txt">{nutrient.description}</div>

                  <ul className="postcard__tagbox">
                    <li className="tag__item">
                      <i className="fas fa-tag mr-2"></i>
                      {nutrient.link}
                    </li>
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default MoreInfo;

