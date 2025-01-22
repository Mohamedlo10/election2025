import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
/*   const authToken = request.cookies.get('sb-uswrtwbzatytmheblrhh-auth-token')?.value || request.cookies.get('sb-tjlasinxumybwhrjkurv-auth-token')?.value
  if (!authToken) {
    console.log('Vous n\'etes pas connecte , Token inexistant', authToken)
    return NextResponse.redirect(new  URL('/', request.url));
  } 
  
  return NextResponse.next();
   */
  
 
}

export const config = {
  matcher: ['/accueil/:path*'],
};


