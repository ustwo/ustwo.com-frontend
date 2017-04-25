import React from 'react';

function CategoryTag({ category, caseStudy }) {  
  return (
    <div className={caseStudy ? 'category-tag-case-study' : 'category-tag'}>{category}</div>
  );
}

export default CategoryTag;
