'use client';

import { TextInput, Select, RangeSlider, Paper, Group, Text } from '@mantine/core';
import { IconSearch, IconMapPin, IconBriefcase, IconCurrencyDollar, IconChevronDown } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onLocationChange: (location: string) => void;
  onJobTypeChange: (type: string) => void;
  onSalaryChange: (range: [number, number]) => void;
}

export function SearchFilters({
  onSearch,
  onLocationChange,
  onJobTypeChange,
  onSalaryChange,
}: SearchFiltersProps) {
  const [sliderValue, setSliderValue] = useState<[number, number]>([0, 80]);

  const handleSliderChange = (value: [number, number]) => {
    setSliderValue(value);
    onSalaryChange(value);
  };

  const selectStyles = {
    input: {
      height: '48px',
      border: 'none',
      backgroundColor: 'transparent',
      color: '#374151',
      '&::placeholder': {
        color: '#374151',
        fontWeight: '500'
      }
    },
    item: {
      color: '#111827',
      fontWeight: '500',
      '&[data-selected]': {
        backgroundColor: '#F3F4F6 !important',
        color: '#111827'
      },
      '&[data-hovered]': {
        backgroundColor: '#F3F4F6',
        color: '#111827'
      }
    },
    dropdown: {
      color: 'black',
      borderRadius: '8px',
      border: '1px solid #E5E7EB',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    rightSection: {
      pointerEvents: 'none',
      width: '24px'
    },
    value: {
      color: '#111827'
    }
  };

  return (
    <div className="w-full flex justify-center" style={{ marginTop: '32px' }}>
      <Paper 
        shadow="sm"
        style={{ 
          width: '1264px',
          height: '80px',
          borderRadius: '16px',
          backgroundColor: '#F9FAFB',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px'
        }}
      >
        <Group grow gap={0} style={{ width: '100%' }}>
          {/* Job Search */}
          <div style={{ 
            position: 'relative',
            paddingRight: '24px',
            flex: 1
          }}>
            <TextInput
              placeholder="Search By Job Title, Role"
              size="md"
              leftSection={<IconSearch size={20} color="#4B5563" />}
              onChange={(e) => onSearch(e.target.value)}
              styles={{
                input: {
                  height: '48px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#374151',
                  '&::placeholder': {
                    color: '#374151',
                    fontWeight: '500'
                  }
                }
              }}
            />
            <div style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '1px',
              height: '24px',
              backgroundColor: '#E5E7EB'
            }} />
          </div>

          {/* Location */}
          <div style={{ 
            position: 'relative',
            paddingRight: '24px',
            flex: 1
          }}>
            <Select
              placeholder="Preferred Location"
              leftSection={<IconMapPin size={20} color="#4B5563" />}
              rightSection={<IconChevronDown size={16} color="#4B5563" />}
              data={[
                'Bangalore',
                'Mumbai',
                'Delhi',
                'Hyderabad',
                'Chennai',
              ]}
              onChange={(value) => onLocationChange(value || '')}
              styles={selectStyles}
            />
            <div style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '1px',
              height: '24px',
              backgroundColor: '#E5E7EB'
            }} />
          </div>

          {/* Job Type */}
          <div style={{ 
            position: 'relative',
            paddingRight: '24px',
            flex: 1
          }}>
            <Select
              placeholder="Job type"
              leftSection={<IconBriefcase size={20} color="#4B5563" />}
              rightSection={<IconChevronDown size={16} color="#4B5563" />}
              data={[
                'Full-time',
                'Part-time',
                'Contract',
                'Internship',
              ]}
              onChange={(value) => onJobTypeChange(value || '')}
              styles={selectStyles}
            />
            <div style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '1px',
              height: '24px',
              backgroundColor: '#E5E7EB'
            }} />
          </div>

          {/* Salary Range */}
          <div style={{ flex: 1 }}>
            <div style={{ padding: '0 12px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <Text size="sm" fw={500} c="#111827">Salary Per Month</Text>
                <Text size="sm" fw={500} c="#111827">₹{sliderValue[0]}k - ₹{sliderValue[1]}k</Text>
              </div>
              <RangeSlider
                min={0}
                max={80}
                step={10}
                minRange={20}
                value={sliderValue}
                marks={[
                  { value: 0, label: '0k' },
                  { value: 80, label: '80k' }
                  // { value: 200, label: '200k' }
                ]}
                labelAlwaysOn={false}
                showLabelOnHover={true}
                onChange={handleSliderChange}
                styles={{
                  root: { marginTop: '4px' },
                  track: {
                    height: '2px',
                    backgroundColor: '#E5E7EB'
                  },
                  bar: { 
                    backgroundColor: 'black',
                    height: '2px'
                  },
                  thumb: { 
                    borderColor: 'black',
                    backgroundColor: 'white',
                    width: '12px',
                    height: '12px'
                  },
                  label: {
                    backgroundColor: 'black',
                    color: 'white'
                  }
                }}
              />
            </div>
          </div>
        </Group>
      </Paper>
    </div>
  );
} 