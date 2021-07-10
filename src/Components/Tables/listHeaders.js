const listHeaders = [
    {
      Header: "ID",
      className: "t-cell-1 text-left",
      accessor: "id",
      notShowSortingDisplay: true,
    },
    {
      Header: "Task Name",
      accessor: "taskName",
      className: "t-cell-2 text-left",
    },
    {
      Header: "Priority",
      accessor: "priority",
      className: "t-cell-3 text-left",
    },
    {
      Header: "Status",
      accessor: "status",
      className: "t-cell-4 text-center",
    },
    {
      Header: "Actions",
      accessor: "actions",
      className: "t-cell-5 text-center",
    },
  ];

  export default listHeaders;