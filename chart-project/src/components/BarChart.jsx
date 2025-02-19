import {useRef, useEffect} from 'react';
import * as d3 from 'd3';
import PropTypes from "prop-types";


const BarChart = ({ data, descriptions }) => {
  const barRef = useRef();
  //  высота ширина
  const width = 300;
  const height = 200;

  useEffect(() => {
    const svg = d3.select(barRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', '#f4f4f4')
      .style('margin-top', '50')
      .style('overflow', 'visible');

    const xScale = d3.scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, width])
      .padding(0.5);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([height, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const xAxis = d3.axisBottom(xScale).tickFormat(i => descriptions[i]);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${height})`);

    svg.append('g')
      .call(yAxis);

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d))
      .attr('fill', (d, i) => colorScale(i));
  }, [data, descriptions]);

  return (
    <div>
      <svg ref={barRef}></svg>
      <div>
        {data.map((_, index) => (
          <div className="diagramDescription" key={index} style={{ marginBottom: '10px' }}>
            <span style={{ color: d3.schemeCategory10[index], fontWeight: 'bold' }}>
              {descriptions[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BarChart;
