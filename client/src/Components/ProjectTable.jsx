import React from 'react'
import ErrorData from './ErrorData'

function ProjectTable({ tableData, allProjectsPage }) {
  if (tableData.length == 0) { return <ErrorData />; }
  return (
    <>
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Client</th>
            <th scope="col">Project Type</th>
            <th scope="col">Features</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((project, index) => (
            <tr key={project._id}>
              <th scope="row">{index + 1}</th>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>{project.client}</td>
              <td>{project.projectType}</td>
              <td>{project.features}</td>
              <td
                className={
                  project.status === "Active"
                    ? "badge bg-success"
                    : "badge bg-danger"
                }
              >
                {project.status}
              </td>
              {allProjectsPage == false ? (<td><button className='btn btn-primary'>{project.status != "Active" ? "Activate" : "Deactivate"}</button></td>) : ""}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ProjectTable