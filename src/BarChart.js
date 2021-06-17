import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const BarChart = () =>{
    const [data,setData] = useState([]);
    const [overallData,setOverallData] = useState([]);
    var labels = [];
    const activeCases = [];
    const deceased = [];
    const totalInfected = [];
    const recovered = [];
    const bgColor = [];
    const borderColor = [];
    
    let url = "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true";

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setData(res.data.regionData);
                setOverallData(res.data);
            });
    }, []);
    
    data.forEach((element) => {
        labels.push(element.region);
        activeCases.push(element.activeCases);
        deceased.push(element.deceased);
        totalInfected.push(element.totalInfected);
        recovered.push(element.recovered);
        bgColor.push('rgba(255, 99, 132, 0.2)');
        borderColor.push('rgba(255, 99, 132, 1)');
    });
    const date = new Date(overallData.lastUpdatedAtApify);
    return(
        <div>
            <h1>This Data is Updated As Of {date.toLocaleString()}</h1>
            <table>
                <th>Active Cases</th><th>Recovered</th><th>Deaths</th><th>Total Cases</th>
                <tr><td>{overallData.activeCases}</td><td>{overallData.recovered}</td><td>{overallData.deaths}</td><td>{overallData.totalCases}</td></tr>
            </table>
            <h1>Active Cases In India</h1>
            <Bar
            data = {{
                labels: labels,
                datasets: [{
                    label: '# of Active Cases',
                    data: activeCases,
                    backgroundColor: bgColor,
                    borderColor: borderColor 
                },],  
                }}
        height={400}
        width={800}
        ></Bar>
        <h1>Number Deceased</h1>
         <Bar
            data = {{
                labels: labels,
                datasets: [{
                    label: '# Deceased',
                    data: deceased,
                    backgroundColor: bgColor,
                    borderColor: borderColor 
                },],  
                }}
        height={400}
        width={800}
        ></Bar>
        <h1>Recovered Cases</h1>
        <Bar
            data = {{
                labels: labels,
                datasets: [{
                    label: '# Recovered',
                    data: recovered,
                    backgroundColor: bgColor,
                    borderColor: borderColor 
                },],  
                }}
        height={400}
        width={800}
        ></Bar>
        <h1>Total Infections</h1>
        <Bar
            data = {{
                labels: labels,
                datasets: [{
                    label: '# Total Infected',
                    data: totalInfected,
                    backgroundColor: bgColor,
                    borderColor: borderColor 
                },],  
                }}
        height={400}
        width={800}
        ></Bar>
        </div>
    );
}
export default BarChart;