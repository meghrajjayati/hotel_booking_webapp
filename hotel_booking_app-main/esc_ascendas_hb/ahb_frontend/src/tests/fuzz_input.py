from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from soupsieve import select
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException

import random
import string


s=Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=s)
#driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.maximize_window()



driver.get("http://localhost:3000")
def fuzz_destination():
    letters = string.ascii_lowercase
    iterations= random.randint(0, 5)
    count=0
    for i in range(iterations):
        length= random.randint(0, 9)
        result_str = ''.join(random.choice(letters) for i in range(length))
        e = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/div/div[1]/div/div/div[1]/div/input[2]")
        e.send_keys((result_str))
        time.sleep(2) 
        e.clear()
        try:
            driver.find_element(By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[7]/a/button")
        except NoSuchElementException:
            print("Cannot find destination")
            count+=1
    if count==iterations:
        print("Destination Test Passed")
    correct_dest = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/div/div[1]/div/div/div[1]/div/input[2]")
    correct_dest.send_keys(("Singapore, Singapore (SIN-Changi)"))
    time.sleep(2) 
    WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[1]/div/div/div[2]/div/div/div[1]"))).click()
    choose_date= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/button").click()
    check_in_date= driver.find_element("xpath", "/html/body/div/div/div/div/div/div[1]/div/div/div[2]/div/div/div[2]/div/div/div[2]/div/div[2]/div[3]/div[7]")
    check_in_date.click()
    check_in= check_in_date.text
    print(check_in_date.text.split())
    WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[3]/div/div/div[1]/button"))).click()
    check_out_date= driver.find_element("xpath", "/html/body/div/div/div/div/div/div[1]/div/div/div[3]/div/div/div[2]/div/div/div[2]/div/div[2]/div[4]/div[1]")
    print(type(check_out_date.text))
    
    WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[7]/a/button"))).click()
    
    response_code = 0

    match response_code:
        #go to room page, choose a room - booking form random strings 
        case 0:
            print(0)
            WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[3]/ul/div[1]/div/div/div[2]/button"))).click()
            time.sleep(2)
            WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[3]/ul/div[1]/div/div/div[3]/a/button"))).click()
            time.sleep(6)

            print("sleep over")

            element=driver.find_element("xpath","/html/body/div/div/div/div/div[4]/div/div/div/div[2]/div/div[1]/div[2]/div/div[4]/a/button")
            driver.execute_script("arguments[0].scrollIntoView();", element)
            time.sleep(3)
            WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div[4]/div/div/div/div[2]/div/div[1]/div[2]/div/div[4]/a/button"))).click()
            time.sleep(2)
            name= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[2]/div[1]/div/input")
            phone_number= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[2]/div[2]/div/input")
            address= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[3]/div/div/input")
            email= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[4]/div/div/input")
            message = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[5]/div/div/textarea")
            card_num = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[3]/div[1]/div/input")
            card_name= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[3]/div[2]/div/input")
            date= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[4]/div[1]/div/input")
            cvv = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[4]/div[2]/div/input")
            letters = string.ascii_lowercase
            submit_booking= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[5]/button")
            it= random.randint(1,3)
            count=0
            for i in range(it):
                length= random.randint(0, 9)
                name_str= ''.join(random.choice(letters) for i in range(length))
                name.send_keys((name_str))
                time.sleep(1)
                random_phone= random.randrange(100000000, 999999999)     
                phone_number.send_keys((random_phone))
                time.sleep(1)
                address_str= ''.join(random.choice(letters) for i in range(length))
                address.send_keys((address_str))
                time.sleep(1)
                email_str= ''.join(random.choice(letters) for i in range(length))
                email.send_keys((email_str))
                time.sleep(1)
                message_str= ''.join(random.choice(letters) for i in range(length))
                message.send_keys((message_str))
                time.sleep(1)
                card_name.send_keys((name_str))
                time.sleep(1)
                date_str= ''.join(random.choice(letters) for i in range(length))
                
                date.send_keys((date_str))
                time.sleep(1)
                card_number= random.randrange(1000000000000000,9000000000000000)     
                card_num.send_keys((card_number))
                time.sleep(1)
                cvv_num= random.randrange(100,9999)     
                cvv.send_keys((cvv_num))
                time.sleep(1)
                time.sleep(4) 
                try:
                    submit_booking.click()
                except:
                    print("Button Cannot be submitted")
                    
                    
                name.clear()
                phone_number.clear()
                address.clear()
                email.clear()
                message.clear()
                card_num.clear()
                card_name.clear()
                date.clear()
                cvv.clear()
                time.sleep(4)
                print(i)
            
            randomemail = ''.join(random.choice(string.ascii_letters) for _ in range(6))+"@gmail.com"
            name.send_keys(("JP"))
            time.sleep(1)
            phone_number.send_keys((3883838383))
            time.sleep(1)
            address.send_keys(("Landmine Road"))
            time.sleep(1)
            email.send_keys((randomemail))
            time.sleep(1)
            message.send_keys(("Extra Bed"))
            time.sleep(1)
            date.send_keys(("12/22"))
            time.sleep(1)
            card_name.send_keys(("PARWANI JAYATI"))
            time.sleep(1)
            card_num.send_keys((6000000000000000))
            time.sleep(1)
            cvv.send_keys((2222))
            time.sleep(5)
            try:
                    submit_booking.click()
                    
            except:
                    print("Button Cannot be submitted")
            
            driver.close()
        
        

            

            
            

            
            

        #map then room page, choose a room - booking form random strings 
        # case 1: 
        #     print(1)
        #     WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[3]/ul/div[2]/div/div/div[3]/a/button"))).click()
        #     WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div[4]/div/div/div/div[2]/div/div[1]/div[2]/div/div[4]/a/button"))).click()

            
        
        # # retrieve booking random strings 
        # case 2:
        #     print(2)
        #     WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/nav/div/div/div/a[2]"))).click()
            
        # # retry dest search  - tanglin ,singapore - booking form random strings 
        # case 3:
        #     print(3)
        #     WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/nav/div/div/div/a[2]"))).click()

            
            
            

        





    
fuzz_destination()