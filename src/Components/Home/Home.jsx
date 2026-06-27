import React from 'react'
import "./Home.css"
import {
    AreaChart, Area,
    BarChart, Bar,
    RadialBarChart, RadialBar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const salesData = [
    { month: 'فروردین', فروش: 4200000 },
    { month: 'اردیبهشت', فروش: 6800000 },
    { month: 'خرداد', فروش: 5100000 },
    { month: 'تیر', فروش: 9300000 },
    { month: 'مرداد', فروش: 7600000 },
    { month: 'شهریور', فروش: 11200000 },
    { month: 'مهر', فروش: 8400000 },
]

const categoryData = [
    { name: 'گوشی', تعداد: 38 },
    { name: 'لپتاپ', تعداد: 22 },
    { name: 'هدفون', تعداد: 45 },
    { name: 'شارژر', تعداد: 60 },
    { name: 'پوشاک', تعداد: 29 },
    { name: 'عمومی', تعداد: 51 },
]

const userScoreData = [
    { name: 'علیرضا احمدی', score: 98, fill: '#471AAA' },
    { name: 'حسین محمدی', score: 31, fill: '#7c4dcc' },
    { name: 'علی حسینی', score: 28, fill: '#b39ddb' },
]

const formatPrice = (value) => {
    if (value >= 1000000) return (value / 1000000).toFixed(0) + 'M'
    if (value >= 1000) return (value / 1000).toFixed(0) + 'K'
    return value
}

const CustomTooltipSales = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="home-tooltip">
                <p className="home-tooltip-label">{label}</p>
                <p className="home-tooltip-value">{payload[0].value.toLocaleString('en-US')} تومان</p>
            </div>
        )
    }
    return null
}

const CustomTooltipCategory = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="home-tooltip">
                <p className="home-tooltip-label">{label}</p>
                <p className="home-tooltip-value">{payload[0].value} سفارش</p>
            </div>
        )
    }
    return null
}

export default function Home() {
    return (
        <div className="home-wrapper">
            <h1 className="home-title">خلاصه داشبورد</h1>

            <div className="home-stats-row">
                <div className="home-stat-card">
                    <span className="home-stat-icon">🛒</span>
                    <div>
                        <p className="home-stat-label">کل سفارشات</p>
                        <p className="home-stat-value">۶</p>
                    </div>
                </div>
                <div className="home-stat-card">
                    <span className="home-stat-icon">🏷️</span>
                    <div>
                        <p className="home-stat-label">کدهای تخفیف</p>
                        <p className="home-stat-value">۶</p>
                    </div>
                </div>
                <div className="home-stat-card">
                    <span className="home-stat-icon">👥</span>
                    <div>
                        <p className="home-stat-label">کاربران</p>
                        <p className="home-stat-value">۳</p>
                    </div>
                </div>
                <div className="home-stat-card">
                    <span className="home-stat-icon">📦</span>
                    <div>
                        <p className="home-stat-label">محصولات</p>
                        <p className="home-stat-value">۷</p>
                    </div>
                </div>
            </div>

            <div className="home-charts-grid">

                <div className="home-chart-card home-chart-card--wide">
                    <h2 className="home-chart-title">فروش ماهانه (تومان)</h2>
                    <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#471AAA" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#471AAA" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" tick={{ fontFamily: 'Lalezar', fontSize: 12 }} />
                            <YAxis tickFormatter={formatPrice} tick={{ fontFamily: 'Lalezar', fontSize: 11 }} width={40} />
                            <Tooltip content={<CustomTooltipSales />} />
                            <Area
                                type="monotone"
                                dataKey="فروش"
                                stroke="#471AAA"
                                strokeWidth={3}
                                fill="url(#salesGradient)"
                                dot={{ r: 5, fill: '#471AAA', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: 7 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="home-chart-card">
                    <h2 className="home-chart-title">سفارشات به تفکیک دسته‌بندی</h2>
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={categoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barSize={28}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontFamily: 'Lalezar', fontSize: 12 }} />
                            <YAxis tick={{ fontFamily: 'Lalezar', fontSize: 11 }} width={30} />
                            <Tooltip content={<CustomTooltipCategory />} />
                            <Bar dataKey="تعداد" fill="#471AAA" radius={[8, 8, 0, 0]}>
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="home-chart-card">
                    <h2 className="home-chart-title">امتیاز کاربران</h2>
                    <ResponsiveContainer width="100%" height={260}>
                        <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="25%"
                            outerRadius="90%"
                            data={userScoreData}
                            startAngle={180}
                            endAngle={-180}
                        >
                            <RadialBar
                                dataKey="score"
                                cornerRadius={8}
                                background={{ fill: '#f0f0f0' }}
                                label={{ position: 'insideStart', fill: '#fff', fontFamily: 'Lalezar', fontSize: 12 }}
                            />
                            <Legend
                                iconSize={10}
                                layout="vertical"
                                verticalAlign="bottom"
                                align="center"
                                formatter={(value, entry) => (
                                    <span style={{ fontFamily: 'Lalezar', fontSize: '13px', color: '#444' }}>
                                        {entry.payload.name}
                                    </span>
                                )}
                            />
                            <Tooltip
                                formatter={(value, name, props) => [props.payload.score + ' امتیاز', props.payload.name]}
                                contentStyle={{ fontFamily: 'Lalezar' }}
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    )
}
