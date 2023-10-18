#include <iostream>
#include "Sculptor.hpp"
int main() {
  Sculptor s(100,100,100);
/*
  s.putBox(10, 50, 10, 50, 10, 11);
  s.putBox(11, 49, 11, 49, 12, 13);
  s.putBox(12, 48, 12, 48, 14, 15);
  s.putBox(13, 47, 13, 47, 16, 17);
  s.putBox(14, 46, 14, 46, 18, 19);
  s.putBox(15, 45, 15, 45, 20, 21);
  s.putBox(16, 44, 16, 44, 22, 23);
  s.putBox(17, 43, 17, 43, 24, 25);
  s.putBox(18, 42, 18, 42, 26, 27);
  s.putBox(19, 41, 19, 41, 28, 29);
  s.putBox(20, 40, 20, 40, 30, 31);
  s.putBox(21, 39, 21, 39, 32, 33);
  s.putBox(22, 38, 22, 38, 34, 35);
  s.putBox(23, 37, 23, 37, 36, 37);
  s.putBox(24, 36, 24, 36, 38, 39);
  s.putBox(25, 35, 25, 35, 40, 41);
  s.putBox(26, 34, 26, 34, 42, 43);
  s.putBox(27, 33, 27, 33, 44, 45);
  s.putBox(28, 32, 28, 32, 46, 47);
  s.putBox(29, 31, 29, 31, 48, 49);
  s.putBox(30, 30, 30, 30, 50, 50);

  s.putSphere(30,30,80,5);
  
  s.setColor(255, 228, 181, 255);
  */

  s.putBox(10,20,10,20,10,20);
  s.cutBox(10,15,10,15,10,15);

  s.putSphere(20,20,20,10);
  s.cutSphere(15,20,20,10);

  s.putEllipsoid(50,50,50,10,15,20);
  s.cutEllipsoid(45,50,50,10,10,10);
  s.setColor(255,0,0,255);
  
  s.writeOFF("esculturaTeste.off");
}