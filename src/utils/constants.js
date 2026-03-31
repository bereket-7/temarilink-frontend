export const GRADES = ['A', 'B', 'C', 'D', 'F'];
export const TERMS = ['First Term', 'Second Term', 'Third Term'];
export const ACADEMIC_YEARS = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => currentYear - i);
};

export const SMS_STATUS = {
  PENDING: 'pending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  FAILED: 'failed'
};

export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STAFF: 'staff'
};
