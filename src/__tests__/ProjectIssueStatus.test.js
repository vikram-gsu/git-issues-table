import { mount } from "enzyme";
import React from 'react';
import toJSON from 'enzyme-to-json';
import ProjectIssueStatus from "../components/ProjectIssueStatus";

const mockResponses = [
  {
    number: 16630,
    title: "Chrome Extension Background Page and useEffect Not Triggered",
    labels: [
      {
        "id": 196858374,
        "node_id": "MDU6TGFiZWwxOTY4NTgzNzQ=",
        "url": "https://api.github.com/repos/facebook/react/labels/CLA%20Signed",
        "name": "CLA Signed",
        "color": "e7e7e7",
        "default": false
      },
      {
        "id": 1296748300,
        "node_id": "MDU6TGFiZWwxMjk2NzQ4MzAw",
        "url": "https://api.github.com/repos/facebook/react/labels/React%20Flare",
        "name": "React Flare",
        "color": "63f2ff",
        "default": false
      }
    ],
    state: "open",
    created_at: "August 31, 2019, 10:31:51 EDT",
    updated_at: "August 31, 2019, 10:39:19 EDT"
  },
  {
    number: 16629,
    title: "Can't use instance values without refs",
    labels: [],
    state: "open",
    created_at: "August 31, 2019, 10:31:51 EDT",
    updated_at: "August 31, 2019, 10:39:19 EDT"
  }

];

describe("<ProjectIssueStatus />", () => {

  it("renders page without crashing", () => {
    mount(<ProjectIssueStatus issues={mockResponses} />);
  })

  it("renders tableheader as expected", () => {
    const wrapper = mount(<ProjectIssueStatus issues={mockResponses} />);
    console.log(wrapper.debug());

    const TableHeader = wrapper.find('TableHeader');
    expect(TableHeader.children().text()).toContain('Issue Number');
    expect(TableHeader.children().text()).toContain('Title');
    expect(TableHeader.children().text()).toContain('Created At');
    expect(TableHeader.children().text()).toContain('Updated At');
    expect(TableHeader.children().text()).toContain('Labels');
    expect(TableHeader.children().text()).toContain('State');
  })

  it("renders tablebody as expected", () => {
    const mockResponse = mockResponses[0];
    const wrapper = mount(<ProjectIssueStatus issues={mockResponses} />);
    console.log(wrapper.debug());

    const TableBody = wrapper.find('TableBody');
    expect(TableBody.children().text()).toContain(mockResponse.title);

    expect(TableBody.find('TableRow').children()).toHaveLength(2);
    expect(toJSON(TableBody)).toMatchSnapshot();
  });
  
  it("renders labels component as expected", () => {
    let mockResponseWithLabels = mockResponses.filter(response => response.labels.length >0);
    mockResponseWithLabels = (mockResponseWithLabels.length>0)?mockResponseWithLabels[0]: mockResponseWithLabels;
    
    let mockResponseWithoutLabels = mockResponses.filter(response => response.labels.length >0);
    mockResponseWithoutLabels = (mockResponseWithoutLabels.length>0)?mockResponseWithoutLabels[0]: mockResponseWithoutLabels;
    
    const wrapper = mount(<ProjectIssueStatus issues={mockResponses} />);
    console.log(wrapper.debug());

    const Labels = wrapper.find('Labels');
    expect(Labels.children().text()).toContain('React Flare');
    expect(Labels.children()).toHaveLength(2);
    
    expect(toJSON(Labels)).toMatchSnapshot()

  })
});
