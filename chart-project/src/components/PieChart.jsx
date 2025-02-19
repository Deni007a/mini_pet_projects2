import { useRef, useEffect} from 'react';
import * as d3 from 'd3';
import PropTypes from "prop-types";

const PieChart = ({ data, descriptions}) => {
  const pieRef = useRef();
  //  высота ширина диограммы
  const width =200;
  const height =200;

  useEffect(() => {
    const svg = d3.select(pieRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', '#f4f4f4')
      .style('margin-top', '50')
      .style('overflow', 'visible')
      .append('g')
      .attr('transform', `translate(${width/2}, ${height/2})`);

    const pie = d3.pie().value(d => d);
    const arc = d3.arc().innerRadius(0).outerRadius(width/2);

    const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => d3.schemeCategory10[i]);

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .text(d => d.data);
  }, [data]);

  return (
    <div>
      <svg ref={pieRef}></svg>
      <div >
        {data.map((_, index) => (
          <div className="diagramDescription" key={index} style={{ marginBottom: '10px' }}>
            <span style={{ color: d3.schemeCategory10[index], fontWeight: 'bold' }}>
              {descriptions[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default PieChart;

