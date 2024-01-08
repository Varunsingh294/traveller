// https://stackoverflow.com/questions/70946170/how-to-implement-pagination-with-filter-in-react


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Pagination, Alert, Modal, Button } from 'react-bootstrap';

// Other imports...

const AdminDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = filter ? filteredData.slice(indexOfFirstRecord, indexOfLastRecord) : userData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil((filter ? filteredData.length : userData.length) / recordsPerPage);

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setFilter(filterValue);
    setCurrentPage(1); // Reset to the first page when the filter changes

    const newFilteredData = userData.filter((user) => {
      const fullName = `${user.fname} ${user.lname}`.toLowerCase();
      return fullName.includes(filterValue.toLowerCase()) || user.email.includes(filterValue.toLowerCase());
    });

    setFilteredData(newFilteredData);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Other functions...

  return (
    <div className="container-fluid">
      {/* Other components... */}
      <div className="container">
        <h1 className="text-center">View User Data</h1>
        <div className="pt-5">
          <input
            type="text"
            placeholder="Filter by name or email..."
            value={filter}
            onChange={handleFilterChange}
          />

          <Table className="table table-success table-striped text-center">
            {/* Table headers... */}
            <tbody>
              {currentRecords.map((user, index) => (
                <tr key={index}>
                  {/* Table data... */}
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            {/* Pagination controls... */}
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


////////////


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Pagination, Alert, Modal, Button } from 'react-bootstrap';

// Other imports...

const AdminDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCurrentPage, setFilteredCurrentPage] = useState(1);

  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const indexOfLastFilteredRecord = filteredCurrentPage * recordsPerPage;
  const indexOfFirstFilteredRecord = indexOfLastFilteredRecord - recordsPerPage;

  const currentRecords = filter
    ? filteredData.slice(indexOfFirstFilteredRecord, indexOfLastFilteredRecord)
    : userData.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil((filter ? filteredData.length : userData.length) / recordsPerPage);

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setFilter(filterValue);
    setFilteredCurrentPage(1); // Reset to the first page when the filter changes

    const newFilteredData = userData.filter((user) => {
      const fullName = `${user.fname} ${user.lname}`.toLowerCase();
      return fullName.includes(filterValue.toLowerCase()) || user.email.includes(filterValue.toLowerCase());
    });

    setFilteredData(newFilteredData);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilteredPageChange = (pageNumber) => {
    setFilteredCurrentPage(pageNumber);
  };

  // Other functions...

  return (
    <div className="container-fluid">
      {/* Other components... */}
      <div className="container">
        <h1 className="text-center">View User Data</h1>
        <div className="pt-5">
          <input
            type="text"
            placeholder="Filter by name or email..."
            value={filter}
            onChange={handleFilterChange}
          />

          <Table className="table table-success table-striped text-center">
            {/* Table headers... */}
            <tbody>
              {currentRecords.map((user, index) => (
                <tr key={index}>
                  {/* Table data... */}
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            {/* Pagination controls... */}
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
