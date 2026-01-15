import React from 'react';
import { MessageSquare, Users, Eye } from 'lucide-react';

const Stats = ({ totalQuestions, totalAnswers, totalViews }) => {
  return (
    <div style={{ display: 'flex', gap: '20px', padding: '30px 20px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px 25px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <MessageSquare size={32} color="#007bff" />
        <div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#333' }}>{totalQuestions}</div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>Questions</div>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px 25px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <Users size={32} color="#28a745" />
        <div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#333' }}>{totalAnswers}</div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>Answers</div>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px 25px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <Eye size={32} color="#ffc107" />
        <div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#333' }}>{totalViews}</div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>Total Views</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
