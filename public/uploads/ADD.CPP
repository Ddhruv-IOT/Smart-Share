#include<stdio.h>
#include<conio.h>
#include"prj.h"
#include<process.h>

void main()
{ clrscr();
int ch;
do
{
 int x,y;
  printf("\nenetr the first number");
  scanf("%d",&x);
  printf("\nenetr the second number");
  scanf("%d",&y);
  add(x,y);
  printf("\n press 1 to continue \n Hit 2 to exit \n");
  scanf("%d",&ch);
}

while(ch==1);
exit(0);
getch();
}