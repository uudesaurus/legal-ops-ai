'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockUsers, mockPendingInvites, User, PendingInvite, UserRole } from '@/lib/mock-data';
import { useToast } from '@/hooks/useToast';
import { InviteModal } from '@/components/features/InviteModal';
import styles from './users.module.css';

const PAGE_SIZE = 10;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>(mockPendingInvites);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [activeKebab, setActiveKebab] = useState<string | null>(null);
  const [roleDropdownUser, setRoleDropdownUser] = useState<User | null>(null);
  const kebabRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const { success } = useToast();

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (kebabRef.current && !kebabRef.current.contains(e.target as Node)) {
        setActiveKebab(null);
      }
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setRoleDropdownUser(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Filter by search
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));

  // Stats
  const totalMembers = users.length;
  const adminCount = users.filter((u) => u.role === 'Admin').length;
  const activeCount = users.filter((u) => u.status === 'Active').length;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleInvite = (email: string, role: 'Admin' | 'User', _?: string) => {
    const newInvite: PendingInvite = {
      id: `p${Date.now()}`,
      email,
      role,
      invitedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setPendingInvites((prev) => [newInvite, ...prev]);
  };

  const handleRoleChange = (user: User, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u))
    );
    setRoleDropdownUser(null);
    success(`${user.name}'s role changed to ${newRole}`);
  };

  const handleDeactivate = (user: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: 'Inactive' } : u))
    );
    setActiveKebab(null);
    success(`${user.name} has been deactivated`);
  };

  const handleDelete = (user: User) => {
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    setActiveKebab(null);
    success(`${user.name} has been removed`);
  };

  const handleResendInvite = (invite: PendingInvite) => {
    success(`Invitation resent to ${invite.email}`);
  };

  const handleRevokeInvite = (invite: PendingInvite) => {
    setPendingInvites((prev) => prev.filter((i) => i.id !== invite.id));
    success(`Invitation to ${invite.email} revoked`);
  };

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <motion.div
        className={styles.pageHeader}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.headerTop}>
          <div>
            <h1 className={styles.pageTitle}>Team Members</h1>
            <p className={styles.pageSubtitle}>Manage your workspace members and invitations</p>
          </div>
          <motion.button
            className={styles.inviteBtn}
            onClick={() => setInviteOpen(true)}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Invite Member
          </motion.button>
        </div>

        {/* Search */}
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M9.5 9.5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          {search && (
            <button className={styles.searchClear} onClick={() => { setSearch(''); setCurrentPage(1); }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          <StatCard label="Total Members" value={totalMembers} />
          <StatCard label="Admins" value={adminCount} accent="warm" />
          <StatCard label="Active" value={activeCount} accent="success" />
          <StatCard label="Pending Invites" value={pendingInvites.length} accent="warning" />
        </div>
      </motion.div>

      {/* Pending Invites */}
      <AnimatePresence>
        {pendingInvites.length > 0 && (
          <motion.div
            className={styles.pendingSection}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleWrap}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1.5C4.515 1.5 2.5 3.515 2.5 6c0 2.17 1.53 4.013 3.565 4.4L6.5 12l.435-1.6C9.47 10.013 11 8.17 11 6c0-2.485-2.015-4.5-4.5-4.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  <path d="M5.5 6h3M5.5 8h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <h3 className={styles.sectionTitle}>Pending Invites</h3>
                <span className={styles.sectionBadge}>{pendingInvites.length}</span>
              </div>
            </div>
            <div className={styles.pendingList}>
              {pendingInvites.map((invite) => (
                <motion.div
                  key={invite.id}
                  className={styles.pendingItem}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={styles.pendingEmail}>
                    <span className={styles.emailAddress}>{invite.email}</span>
                    <span className={styles.inviteMeta}>
                      {invite.role} · Invited {invite.invitedDate}
                    </span>
                  </div>
                  <div className={styles.pendingActions}>
                    <button
                      className={styles.pendingActionBtn}
                      onClick={() => handleResendInvite(invite)}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1.5 6A4.5 4.5 0 0 1 6 1.5c.7 0 1.37.17 1.96.46L9.5 2.5A5.5 5.5 0 0 0 6 1C3.015 1 0.5 3.515 0.5 6.5S3.015 12 6 12c2.2 0 4.08-1.33 4.9-3.27" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M8 3.5h2.5V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Resend
                    </button>
                    <button
                      className={`${styles.pendingActionBtn} ${styles.pendingActionBtnDestructive}`}
                      onClick={() => handleRevokeInvite(invite)}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      Revoke
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Users Table */}
      <motion.div
        className={styles.tableCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {filteredUsers.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="14" r="7" stroke="currentColor" strokeWidth="1.2" />
                <path d="M6 36c0-7.732 6.268-12 14-12s14 4.268 14 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <p className={styles.emptyTitle}>No members found</p>
            <p className={styles.emptyHint}>
              {search ? 'Try adjusting your search terms.' : 'Invite your first team member to get started.'}
            </p>
            {search && (
              <button className={styles.emptyAction} onClick={() => setSearch('')}>
                Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Member</th>
                    <th className={styles.th}>Role</th>
                    <th className={styles.th}>Status</th>
                    <th className={styles.th}>Joined</th>
                    <th className={styles.th}>Last Active</th>
                    <th className={`${styles.th} ${styles.thActions}`}></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user, i) => (
                    <motion.tr
                      key={user.id}
                      className={styles.tr}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.04,
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {/* Member */}
                      <td className={styles.td}>
                        <div className={styles.memberCell}>
                          <div
                            className={styles.avatar}
                            style={{ backgroundColor: user.color }}
                          >
                            <span className={styles.avatarText}>{user.initials}</span>
                          </div>
                          <div className={styles.memberInfo}>
                            <span className={styles.memberName}>{user.name}</span>
                            <span className={styles.memberEmail}>{user.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className={styles.td}>
                        <div className={styles.roleCell} ref={roleDropdownUser?.id === user.id ? roleRef : undefined}>
                          {roleDropdownUser?.id === user.id ? (
                            <motion.div
                              className={styles.roleDropdown}
                              initial={{ opacity: 0, scale: 0.95, y: -4 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {(['Admin', 'User'] as UserRole[]).map((r) => (
                                <button
                                  key={r}
                                  className={`${styles.roleOption} ${user.role === r ? styles.roleOptionActive : ''}`}
                                  onClick={() => handleRoleChange(user, r)}
                                >
                                  {r === 'Admin' && (
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                      <path d="M6 1l1.2 2.4 2.8.4-2 2 .5 2.7L6 7.2l-2.5 1.3.5-2.7-2-2 2.8-.4L6 1z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                                    </svg>
                                  )}
                                  {r === 'User' && (
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                      <circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1" />
                                      <path d="M1.5 11c0-2.485 2.015-3.5 4.5-3.5s4.5 1.015 4.5 3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                                    </svg>
                                  )}
                                  {r}
                                </button>
                              ))}
                            </motion.div>
                          ) : (
                            <button
                              className={`${styles.roleBadge} ${user.role === 'Admin' ? styles.roleBadgeAdmin : styles.roleBadgeUser}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setRoleDropdownUser(user);
                              }}
                            >
                              {user.role === 'Admin' && (
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                  <path d="M5 0.8l.9 1.8 2.1.3-1.5 1.5.4 2L5 5.5l-1.9 1.1.4-2L2 3l2.1-.3L5 0.8z" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
                                </svg>
                              )}
                              {user.role}
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className={styles.td}>
                        <div className={styles.statusCell}>
                          <span
                            className={`${styles.statusDot} ${
                              user.status === 'Active'
                                ? styles.statusActive
                                : user.status === 'Pending'
                                ? styles.statusPending
                                : styles.statusInactive
                            }`}
                          />
                          <span className={styles.statusLabel}>{user.status}</span>
                        </div>
                      </td>

                      {/* Joined */}
                      <td className={styles.td}>
                        <span className={styles.metaText}>{user.joined}</span>
                      </td>

                      {/* Last Active */}
                      <td className={styles.td}>
                        <span className={styles.metaText}>{user.lastActive}</span>
                      </td>

                      {/* Actions */}
                      <td className={`${styles.td} ${styles.tdActions}`}>
                        <div
                          className={styles.actionsWrap}
                          ref={activeKebab === user.id ? kebabRef : undefined}
                        >
                          <button
                            className={styles.kebabBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveKebab(activeKebab === user.id ? null : user.id);
                            }}
                            aria-label="Actions"
                          >
                            <KebabIcon />
                          </button>
                          <AnimatePresence>
                            {activeKebab === user.id && (
                              <motion.div
                                className={styles.kebabMenu}
                                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                                transition={{ duration: 0.15 }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  className={styles.menuItem}
                                  onClick={() => {
                                    setRoleDropdownUser(user);
                                    setActiveKebab(null);
                                  }}
                                >
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <circle cx="6" cy="3" r="2" stroke="currentColor" strokeWidth="1" />
                                    <path d="M1.5 11c0-2.485 2.015-3.5 4.5-3.5s4.5 1.015 4.5 3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                                  </svg>
                                  Change Role
                                </button>
                                <button
                                  className={styles.menuItem}
                                  onClick={() => {
                                    setRoleDropdownUser(user);
                                    setActiveKebab(null);
                                  }}
                                >
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M8.5 2.5L9.5 3.5L4 9H3v-1L8.5 2.5z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                                    <path d="M1 10h10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                                  </svg>
                                  Edit Profile
                                </button>
                                {user.status !== 'Inactive' && (
                                  <button
                                    className={styles.menuItem}
                                    onClick={() => handleDeactivate(user)}
                                  >
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1" />
                                      <path d="M4 4l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                    </svg>
                                    Deactivate
                                  </button>
                                )}
                                <div className={styles.menuDivider} />
                                <button
                                  className={`${styles.menuItem} ${styles.menuItemDestructive}`}
                                  onClick={() => handleDelete(user)}
                                >
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 3.5h8M4 3.5V2.5h4v1M5 5.5v4M7 5.5v4M3 3.5l.5 7h5l.5-7" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                                  </svg>
                                  Delete Member
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  className={styles.pageBtn}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Prev
                </button>
                <div className={styles.pageNumbers}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`${styles.pageNumber} ${currentPage === page ? styles.pageNumberActive : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  className={styles.pageBtn}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </motion.div>

      {/* Invite Modal */}
      <InviteModal
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onInvite={handleInvite}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: 'warm' | 'success' | 'warning';
}) {
  return (
    <div className={`${styles.statCard} ${accent ? styles[`statCard${accent.charAt(0).toUpperCase() + accent.slice(1)}`] : ''}`}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

function KebabIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="3.5" r="1.2" fill="currentColor" />
      <circle cx="8" cy="8" r="1.2" fill="currentColor" />
      <circle cx="8" cy="12.5" r="1.2" fill="currentColor" />
    </svg>
  );
}
