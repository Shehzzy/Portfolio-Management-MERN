import React from "react";

function MainProjectCards({ cardData }) {
  return (
    <div className="row">
      {cardData.map((project, index) => {
        return (
          <div key={project._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <img src={project.cover} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">
                  {project.description}
                </p>
                <a href="#" className={project.status == "Active" ? "btn btn-success" : "btn btn-danger"}>
                  {project.status}
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MainProjectCards;
