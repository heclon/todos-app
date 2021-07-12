import React from "react";
import { mount } from "enzyme";
import App from "../../App";
import TodosTable from "./TodosTable";
import ModalAddEdit from "../Modals/ModalAddEdit";
import ModalConfirmDelete from "../Modals/ModalConfirmDelete";
import renderer from "react-test-renderer";
import mockedItems from "./mockedItems";
import listHeaders from "./listHeaders";

describe("TodosTable tests", () => {
  let todoTableComponent;
  beforeEach(() => {
    todoTableComponent = mount(
      <TodosTable
        columns={listHeaders}
        data={mockedItems}
        updateState={App.updateState}
        deleteItemFromState={App.deleteItemFromState}
        loading={false}  
    />
    );
  });

  it("snapshot test render correctly TodosTable component", () => {
    const todoTable = renderer
      .create(
        <TodosTable
        columns={listHeaders}
        data={mockedItems}
        updateState={App.updateState}
        deleteItemFromState={App.deleteItemFromState}
        loading={false}  
      />
      )
      .toJSON();
    expect(todoTable).toMatchSnapshot();
  });

  it("Test that TodosTable renders to-do items correctly", () => {
    // there should be one table HTML element rendered
    const table = todoTableComponent.find("table");
    expect(table).toHaveLength(1);

    // that table shoud be rendered with its header
    const headerRow = table.find("thead");
    expect(headerRow).toHaveLength(1);

    // there should be 4 headers
    const headers = headerRow.find("th");
    expect(headers).toHaveLength(5);

    const headerId = headers.at(0);
    expect(headerId.text()).toBe("ID");

    const headerTaskName = headers.at(1);
    expect(headerTaskName.text()).toBe("Task Name");

    const headerPriority = headers.at(2);
    expect(headerPriority.text()).toBe("Priority");

    // there should be 1 table body with 6 rows for mocked items
    const body = table.find("tbody");
    expect(body).toHaveLength(1);

    const rows = body.find("tr");
    expect(rows).toHaveLength(5);

    // there should be a ModalAddEdit for each of the mocked items
    const editButtons = table.find(ModalAddEdit);
    expect(editButtons).toHaveLength(5);

    // and a ModalConfirmDelete for each of the mocked items
    const deleteButtons = table.find(ModalConfirmDelete);
    expect(deleteButtons).toHaveLength(5);

    // now let's test the values passed => the first mocked item vs the first row
    // ID are non-editable and
    // reactstrap displays them as th, not as td
    const tds = body.find("td");
    expect(tds.at(0).text()).toBe(mockedItems[0].id);

    expect(tds.at(1).text()).toBe(mockedItems[0].taskName);
    expect(tds.at(2).text()).toBe(mockedItems[0].priority);
    expect(tds.at(3).text()).toBe(mockedItems[0].status);
  });

  describe("test TodosTable sorts", () => {
    it("Test sort in ASC order upon click on taskName header", () => {
      // Simulate click on Task To-do name
      const thead = todoTableComponent.find("thead");
      const headers = thead.find("th");
      const headerTaskName = headers.at(1);
      headerTaskName.simulate("click");

      // and check for sorted items on the table
      // Now the first item should be:
      // {
      //   id: "awsx",
      //   taskName: "AWS Architecture exams",
      //   priority: "2-Medium",
      //   priorityValue: 2,
      // },
      const tableAfterSort = todoTableComponent.find("table");
      const body = tableAfterSort.find("tbody");
      const tds = body.find("td");

      expect(tds.at(0).text()).toBe("awsx");

      expect(tds.at(1).text()).toBe("AWS Architecture exams");
      expect(tds.at(2).text()).toBe("2-Medium");
      expect(tds.at(3).text()).toBe("Pending");
    });

    it("Test sort in DESC order upon click on task-name header", () => {
      // Simulate click on Task To-do name
      const thead = todoTableComponent.find("thead");
      const headers = thead.find("th");
      const headerTaskName = headers.at(1);

      //To get DESC order we need 2 clicks
      headerTaskName.simulate("click");
      headerTaskName.simulate("click");

      // and check for sorted items on the table
      // Now the first item should be:
      // {
      //   id: "zing",
      //   taskName: "Zing-Zing last",
      //   priority: "2-Medium",
      //   priorityValue: 2,
      // },
      const tableAfterSort = todoTableComponent.find("table");
      const body = tableAfterSort.find("tbody");
      const tds = body.find("td");

      expect(tds.at(0).text()).toBe("zing");
      expect(tds.at(1).text()).toBe("Zing-Zing last");
      expect(tds.at(2).text()).toBe("2-Medium");
      expect(tds.at(3).text()).toBe("Done");
    });

    it("Test sort in ASC order upon click on priority name header", () => {
      // Simulate click on Task To-do name
      const thead = todoTableComponent.find("thead");
      const headers = thead.find("th");
      const headerTaskName = headers.at(2);

      headerTaskName.simulate("click");

      // and check for sorted items on the table
      // Now the first item should be:
      // {
      //   id: "hook",
      //   taskName: "Demo React Hooks",
      //   priority: "1-High",
      //   priorityValue: 1,
      // },
      const tableAfterSort = todoTableComponent.find("table");
      const body = tableAfterSort.find("tbody");
      const tds = body.find("td");

      expect(tds.at(0).text()).toBe("hook");
      expect(tds.at(1).text()).toBe("Demo React Hooks");
      expect(tds.at(2).text()).toBe("1-High");
      expect(tds.at(3).text()).toBe("In progress");
    });

    it("Test sort in DESC order upon click on priority header", () => {
      // Simulate click on Task To-do name
      const thead = todoTableComponent.find("thead");
      const headers = thead.find("th");
      const headerTaskName = headers.at(2);

      headerTaskName.simulate("click");
      headerTaskName.simulate("click");

      // and check for sorted items on the table
      // Now the first item should be:
      // {
      //   id: "pyad",
      //   taskName: "Python advanced learning",
      //   priority: "3-Low",
      //   priorityValue: 3,
      // },
      const tableAfterSort = todoTableComponent.find("table");
      const body = tableAfterSort.find("tbody");
      const tds = body.find("td");

      expect(tds.at(0).text()).toBe("pyad");
      expect(tds.at(1).text()).toBe("Python advanced learning");
      expect(tds.at(2).text()).toBe("3-Low");
      expect(tds.at(3).text()).toBe("Pending");
    });
  });

  describe("Test TodosTable button actions", () => {

    it("Edit button saves the item new state on todos table", () => {

    });
    it("Delete button removes item from todos table", () => {

    });
  });
});
