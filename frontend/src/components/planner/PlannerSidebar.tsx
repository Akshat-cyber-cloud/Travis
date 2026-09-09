import React from 'react';
import { HistoryItem } from '../../types/plan';

interface PlannerSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onSelectHistory: (prompt: string) => void;
  onDeleteHistoryItem?: (id: string) => void;
  onClearHistory?: () => void;
  historyList: HistoryItem[];
  onNewPlan: () => void;
  onBackToHome: () => void;
}

const renderCategoryIcon = (type: HistoryItem['iconType']) => {
  switch (type) {
    case 'launch':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 01-3.95 2z" />
        </svg>
      );
    case 'design':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
    case 'marketing':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" />
        </svg>
      );
    case 'tech':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
  }
};

export const PlannerSidebar: React.FC<PlannerSidebarProps> = ({
  isOpen,
  onToggle,
  onSelectHistory,
  onDeleteHistoryItem,
  onClearHistory,
  historyList,
  onNewPlan,
  onBackToHome,
}) => {
  // Group history items dynamically
  const groupsOrder: HistoryItem['group'][] = ['Today', 'Yesterday', 'Previous 7 Days'];

  const groupedSections = groupsOrder
    .map((groupName) => ({
      group: groupName,
      items: historyList.filter((item) => item.group === groupName),
    }))
    .filter((sec) => sec.items.length > 0);

  // Catch any items that have custom/other group names
  const knownGroups = new Set(groupsOrder);
  const otherItems = historyList.filter((item) => !knownGroups.has(item.group));

  if (otherItems.length > 0) {
    groupedSections.push({
      group: 'Previous 7 Days',
      items: otherItems,
    });
  }

  return (
    <aside className={`planner-sidebar ${isOpen ? 'open' : 'closed'}`}>
      {/* ── Sidebar Top Branding & Inner Toggle Button ── */}
      <div className="planner-sidebar-header">
        <div className="planner-sidebar-brand" onClick={onBackToHome} style={{ cursor: 'pointer' }}>
          <span className="planner-sidebar-dot" />
          <span className="planner-sidebar-brand-name">Travis AI</span>
        </div>

        {/* Sidebar Toggle Button inside Sidebar Header */}
        <button
          className="planner-sidebar-toggle-btn-inner"
          onClick={onToggle}
          title="Collapse sidebar"
          aria-label="Collapse sidebar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18" />
          </svg>
        </button>
      </div>

      {/* ── New Plan & Home CTA Buttons ── */}
      <div className="planner-sidebar-actions">
        <button className="planner-sidebar-new-btn" onClick={onNewPlan}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          <span>New Plan Request</span>
        </button>

        <button className="planner-sidebar-home-btn" onClick={onBackToHome}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Return to Landing Page</span>
        </button>
      </div>

      {/* ── Dynamic Chat History Scroll Area ── */}
      <div className="planner-sidebar-scroll">
        <div className="planner-sidebar-history-top">
          <span className="planner-sidebar-history-heading">Recents ({historyList.length})</span>
          {historyList.length > 0 && onClearHistory && (
            <button className="planner-clear-history-btn" onClick={onClearHistory} title="Clear all history">
              Clear
            </button>
          )}
        </div>

        {groupedSections.length === 0 ? (
          <div className="planner-sidebar-empty-history">
            <span>No previous plan requests</span>
          </div>
        ) : (
          groupedSections.map((section) => (
            <div key={section.group} className="planner-history-group">
              <span className="planner-history-section-title">{section.group}</span>
              <div className="planner-history-list">
                {section.items.map((item) => (
                  <div key={item.id} className="planner-history-item-wrap">
                    <button
                      className="planner-history-item"
                      onClick={() => onSelectHistory(item.prompt)}
                      title={`Load prompt: "${item.prompt}"`}
                    >
                      <span className="planner-history-icon">{renderCategoryIcon(item.iconType)}</span>
                      <div className="planner-history-text">
                        <span className="planner-history-item-title">{item.title}</span>
                        <span className="planner-history-time">{item.timeFormatted}</span>
                      </div>
                    </button>

                    {onDeleteHistoryItem && (
                      <button
                        className="planner-history-delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteHistoryItem(item.id);
                        }}
                        title="Delete from history"
                        aria-label="Delete history item"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── User Profile Footer ── */}
      <div className="planner-sidebar-footer">
        <div className="planner-user-avatar">G</div>
        <div className="planner-user-info">
          <span className="planner-user-name">Guest User</span>
          <span className="planner-user-plan">Pro Plan Member</span>
        </div>
        <button className="planner-settings-btn" title="Planner settings">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>
      </div>
    </aside>
  );
};
