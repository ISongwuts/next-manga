import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type MainPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const MainPagination = ({ currentPage, totalPages, onPageChange }: MainPaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Calculate which pages to display based on total pages and current page
  const pagesToDisplay = () => {
    if (totalPages <= 3) {
      return [...Array(totalPages)].map((_, page) => page + 1);
    } else {
      if (currentPage <= 2) {
        return [1, 2, '...', totalPages];
      } else if (currentPage >= totalPages - 1) {
        return [1, '...', totalPages - 1, totalPages];
      } else {
        return [1, '...', currentPage, '...', totalPages];
      }
    }
  };

  return (
    <Pagination className='col-span-6'>
      <PaginationContent>
        <PaginationItem className=' cursor-pointer'>
          <PaginationPrevious onClick={handlePrevious} />
        </PaginationItem >
        {pagesToDisplay().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <PaginationItem>
                <span className="px-2">...</span>
              </PaginationItem>
            ) : (
              <PaginationItem key={page} className={`cursor-pointer`}>
                <PaginationLink className={`${page == currentPage && 'bg-primary text-primary-foreground'}`} onClick={() => onPageChange((page as number))}>{page}</PaginationLink>
              </PaginationItem>
            )}
          </React.Fragment>
        ))}
        <PaginationItem className=' cursor-pointer'>
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default MainPagination;
