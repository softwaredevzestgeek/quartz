interface colorProps {
  rectangleColor: string;
  pathColor: string;
}

const VisibilityOff = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="6" y="6" width="20" height="20" rx="3" fill="#414E66" />
      <path
        d="M10.498 14C10.4551 14 10.4121 14.0059 10.3691 14.0176C10.2598 14.0488 10.1699 14.1093 10.0996 14.1991C10.0332 14.2888 10 14.3903 10 14.5035C10 14.5504 10.0059 14.5933 10.0176 14.6323C10.248 15.4793 10.6562 16.2326 11.2422 16.8923C11.832 17.5558 12.5391 18.073 13.3633 18.4438C14.1914 18.8146 15.0703 19 16 19C16.9297 19 17.8066 18.8146 18.6309 18.4438C19.459 18.0769 20.166 17.5617 20.752 16.8981C21.3418 16.2385 21.752 15.4871 21.9824 14.644C21.9941 14.5972 22 14.5523 22 14.5094C22 14.3728 21.9531 14.2557 21.8594 14.1581C21.7656 14.0605 21.6465 14.0117 21.502 14.0117C21.3887 14.0117 21.2871 14.0449 21.1973 14.1112C21.1074 14.1776 21.0469 14.2654 21.0156 14.3747C20.8242 15.0773 20.4824 15.7037 19.9902 16.2541C19.502 16.8044 18.9102 17.2319 18.2148 17.5363C17.5195 17.8447 16.7812 17.9988 16 17.9988C15.2188 17.9988 14.4805 17.8447 13.7852 17.5363C13.0898 17.2279 12.4961 16.7986 12.0039 16.2482C11.5156 15.6979 11.1758 15.0714 10.9844 14.3689C10.9531 14.2596 10.8926 14.1698 10.8027 14.0995C10.7129 14.0332 10.6113 14 10.498 14Z"
        fill="#EAEAEA"
      />
    </svg>
  );
};

export default VisibilityOff;
