import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const IntakeChart = ({ branchCode, branchName, category, gender }) => {
    const [intakeData, setIntakeData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('/INTAKE_DATASET.csv');
                const csvText = await response.text();
                Papa.parse(csvText, {
                    header: true,
                    complete: (results) => {
                        setIntakeData(results.data);
                        setLoading(false);
                    },
                    error: (error) => {
                        console.error('Error parsing intake CSV:', error);
                        setLoading(false);
                    }
                });
            } catch (error) {
                console.error('Error loading intake data:', error);
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Normalize gender for matching (GENERAL -> General, LADIES -> Ladies)
    const normalizeGender = (g) => {
        if (!g) return '';
        const lower = g.toLowerCase();
        if (lower === 'general') return 'General';
        if (lower === 'ladies') return 'Ladies';
        return g;
    };

    const chartData = useMemo(() => {
        if (!branchCode || intakeData.length === 0) return null;

        const normalizedGender = normalizeGender(gender);

        // Filter by Choice_Code (branch_code), Category, and Gender
        const filtered = intakeData.filter(row => {
            const choiceCode = row.Choice_Code || '';
            const rowCategory = row.Category || '';
            const rowGender = row.Gender || '';

            // Match Choice_Code with branchCode
            const codeMatch = choiceCode === branchCode || choiceCode.endsWith(branchCode);
            // Match Category
            const categoryMatch = !category || rowCategory.toUpperCase() === category.toUpperCase();
            // Match Gender
            const genderMatch = !normalizedGender || rowGender === normalizedGender;

            return codeMatch && categoryMatch && genderMatch;
        });

        // Aggregate seats by year
        const yearlySeats = {};
        filtered.forEach(row => {
            const year = row.Year;
            const seats = parseInt(row.Seats) || 0;
            if (year) {
                yearlySeats[year] = (yearlySeats[year] || 0) + seats;
            }
        });

        const years = Object.keys(yearlySeats).sort();
        const seats = years.map(y => yearlySeats[y]);

        return { years, seats, matchCount: filtered.length };
    }, [branchCode, category, gender, intakeData]);

    if (loading) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-orange-200 rounded w-3/4"></div>
                        <div className="h-32 bg-orange-100 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!chartData || chartData.years.length === 0) {
        return (
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 rounded-[1.5rem] blur opacity-20"></div>
                <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/50 h-full flex flex-col items-center justify-center min-h-[200px]">
                    <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500 text-sm text-center">No intake data available<br />for this combination</p>
                </div>
            </div>
        );
    }

    const data = {
        labels: chartData.years,
        datasets: [{
            label: 'Seats',
            data: chartData.seats,
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
            borderColor: '#4f46e5',
            borderWidth: 2,
            borderRadius: 8,
            hoverBackgroundColor: 'rgba(99, 102, 241, 1)',
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1f2937',
                bodyColor: '#4b5563',
                borderColor: 'rgba(99, 102, 241, 0.2)',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 12,
                callbacks: {
                    title: (items) => `📅 Year ${items[0].label}`,
                    label: (context) => `Seats: ${context.parsed.y.toLocaleString()}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    font: { size: 11, weight: '600' },
                    color: '#9ca3af',
                    stepSize: 1,
                    callback: (value) => Number.isInteger(value) ? value : ''
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.03)',
                    drawBorder: false
                },
                border: { display: false }
            },
            x: {
                ticks: {
                    font: { size: 12, weight: '600' },
                    color: '#6b7280'
                },
                grid: { display: false },
                border: { display: false }
            }
        }
    };

    return (
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 rounded-[1.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/50 h-full">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900">Seat Intake</h3>
                        <p className="text-xs text-gray-500 truncate" title={`${category} | ${gender}`}>
                            {category} • {gender === 'GENERAL' ? 'General' : 'Ladies'}
                        </p>
                    </div>
                </div>
                <div className="h-[180px]">
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default IntakeChart;
