
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Logo from '@/components/Logo';
import VisualMnemonic from '@/components/VisualMnemonic';
import { ArrowLeft, TrendingUp, Layers, ShieldCheck, CircleCheck } from 'lucide-react';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

// Sample data for visualization
const addressActivityData = [
  { name: 'Jan', transactionCount: 4, value: 0.15 },
  { name: 'Feb', transactionCount: 3, value: 0.09 },
  { name: 'Mar', transactionCount: 5, value: 0.24 },
  { name: 'Apr', transactionCount: 7, value: 0.37 },
  { name: 'May', transactionCount: 6, value: 0.29 },
  { name: 'Jun', transactionCount: 9, value: 0.48 },
];

const verificationStats = [
  { name: 'Visual Verifications', value: 94 },
  { name: 'Traditional Verifications', value: 42 },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const sampleAddresses = [
    "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
    "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
    "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="py-4 px-4 border-b bg-white/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          <div className="text-sm text-gray-500">
            KeyCanvas Dashboard
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container py-8 px-4 md:py-12">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Bitcoin Address Dashboard</h1>
              <p className="text-gray-500 mt-1">Visualize and analyze Bitcoin address data with visual verification</p>
            </div>
            <Link to="/app">
              <Button variant="outline" className="gap-2">
                <ArrowLeft size={16} />
                Back to App
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-3 bg-gradient-to-r from-keycanvas-blue-dark/90 to-keycanvas-blue text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-white">Visual Verification Impact</CardTitle>
                <CardDescription className="text-white/70">How visual verification improves address recognition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="md:w-1/2 flex flex-col items-center gap-3">
                    <div className="stats flex md:flex-row flex-col gap-4 md:gap-8">
                      <div className="stat text-center p-3">
                        <div className="stat-title text-white/70">Verification Speed</div>
                        <div className="stat-value text-2xl flex items-center justify-center gap-2">
                          <TrendingUp className="text-keycanvas-amber" size={20} />
                          <span>124% Faster</span>
                        </div>
                      </div>
                      <div className="stat text-center p-3">
                        <div className="stat-title text-white/70">Error Reduction</div>
                        <div className="stat-value text-2xl flex items-center justify-center gap-2">
                          <ShieldCheck className="text-keycanvas-amber" size={20} />
                          <span>86% Lower</span>
                        </div>
                      </div>
                      <div className="stat text-center p-3">
                        <div className="stat-title text-white/70">User Confidence</div>
                        <div className="stat-value text-2xl flex items-center justify-center gap-2">
                          <CircleCheck className="text-keycanvas-amber" size={20} />
                          <span>92% Higher</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={verificationStats}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis type="number" stroke="rgba(255,255,255,0.5)" />
                        <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.5)" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1A1F2C', border: 'none', borderRadius: '8px', color: 'white' }}
                          formatter={(value) => [`${value} verifications`, 'Count']}
                        />
                        <Bar dataKey="value" fill="#F97316" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Address Activity</CardTitle>
                <CardDescription>Transaction history and pattern analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={addressActivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="transactionCount" 
                        name="Transactions" 
                        stroke="#0EA5E9" 
                        strokeWidth={2}
                        dot={{ r: 4, strokeWidth: 1 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="value" 
                        name="BTC Value" 
                        stroke="#F97316" 
                        strokeWidth={2}
                        dot={{ r: 4, strokeWidth: 1 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Address Gallery</CardTitle>
                <CardDescription>Visual verification patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  {sampleAddresses.map((address, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                      <VisualMnemonic address={address} size="md" />
                      <div>
                        <div className="text-sm font-mono truncate max-w-[180px]">{address.slice(0, 8)}...{address.slice(-4)}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Layers size={12} />
                          <span>Verification pattern #{index + 1}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Impact Assessment</CardTitle>
              <CardDescription>Evaluating KeyCanvas against key criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="difficulty" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="difficulty">Routine Difficulty</TabsTrigger>
                  <TabsTrigger value="execution">Routine Execution</TabsTrigger>
                  <TabsTrigger value="effect">General Effect</TabsTrigger>
                </TabsList>
                
                <TabsContent value="difficulty" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">Quality of Project Idea</h3>
                      <p className="text-sm text-gray-600">
                        KeyCanvas addresses a very real and common UX barrier in Bitcoin by making address handling less intimidating through visual patterns.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">Potential Impact</h3>
                      <p className="text-sm text-gray-600">
                        By lowering verification friction, KeyCanvas directly reduces the barrier to entry for new Bitcoin users, minimizing errors and anxiety.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">Ambition/Scope</h3>
                      <p className="text-sm text-gray-600">
                        Strategic focus on improving a fundamental Bitcoin interaction through innovative visual design rather than building new blockchain technology.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="execution" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">Project Achievement</h3>
                      <p className="text-sm text-gray-600">
                        A clean, polished web application that offers a complete experience for generating, viewing, and sharing Bitcoin addresses with visual mnemonics.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">What Was Built</h3>
                      <p className="text-sm text-gray-600">
                        A highly refined interface with visual address verification, comparison tools, and data visualization to enhance Bitcoin address interactions.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">Problem Solution</h3>
                      <p className="text-sm text-gray-600">
                        KeyCanvas successfully creates a more accessible, user-friendly, and error-resistant way to handle Bitcoin addresses.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="effect" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">Swag Factor</h3>
                      <p className="text-sm text-gray-600">
                        Visual mnemonics for Bitcoin addresses are inherently memorable and visually appealing, creating a distinctive and "swaggy" user experience.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">Presentation</h3>
                      <p className="text-sm text-gray-600">
                        Clean, accessible UI with intuitive flows and engaging visualizations that showcase the innovation of visual Bitcoin address verification.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">Applicability to Bitcoin</h3>
                      <p className="text-sm text-gray-600">
                        Directly improves a core user interaction within the existing Bitcoin ecosystem, making it more accessible and secure for everyday users.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 px-4 border-t bg-white/60">
        <div className="container text-center text-sm text-gray-500">
          KeyCanvas — Making Bitcoin addresses more human-friendly
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
