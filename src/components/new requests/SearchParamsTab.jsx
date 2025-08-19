"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { tabs, initialTab } from '@/constants/requestConstants';

const SearchParamsTab = ({ setActiveTab }) => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const tab = tabs.find((tab) => tab.category === categoryParam)?.label || initialTab;

  React.useEffect(() => {
    setActiveTab(tab);
  }, [categoryParam, setActiveTab, tab]);

  return null;
};

export default SearchParamsTab;