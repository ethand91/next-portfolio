import Link from 'next/link';

function NavItem(props) {
  return (
    <>
      <Link href={ props.link } legacyBehavior>
        <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white">
          { props.title }
        </a>
      </Link>
    </>
  );
}

export default NavItem;
