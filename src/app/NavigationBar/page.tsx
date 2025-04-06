"use client";

import React from 'react';
import { Home, UserPlus, List, Search } from 'lucide-react';

export default function NavigationBar() {
  const navItems = [
    {
      label: 'Add a new Student',
      icon: UserPlus,
      href: '/AddStudent',
      bgColor: 'bg-gradient-to-r from-green-400 to-green-600',
      hoverColor: 'hover:from-green-500 hover:to-green-700'
    },
    {
      label: 'List All Students',
      icon: List,
      href: '/AllStudent',
      bgColor: 'bg-gradient-to-r from-blue-400 to-blue-600',
      hoverColor: 'hover:from-blue-500 hover:to-blue-700'
    },
    {
      label: 'View and Edit Student Data',
      icon: Search,
      href: '/SearchStudent',
      bgColor: 'bg-gradient-to-r from-purple-400 to-purple-600',
      hoverColor: 'hover:from-purple-500 hover:to-purple-700'
    }
  ];

  return (
    <nav className="w-full bg-white shadow-lg rounded-b-xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Home className="text-gray-600 w-8 h-8" />
            <span className="text-xl font-bold text-gray-800">Student Management</span>
          </div>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => window.location.href = item.href}
                className={`
                  flex items-center space-x-2 
                  px-4 py-2 
                  ${item.bgColor} 
                  ${item.hoverColor}
                  text-white 
                  rounded-lg 
                  shadow-md 
                  transform 
                  transition-all 
                  duration-300 
                  hover:scale-105 
                  hover:shadow-xl 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-offset-2 
                  focus:ring-opacity-50
                `}
              >
                <item.icon className="w-5 h-5 mr-2" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}