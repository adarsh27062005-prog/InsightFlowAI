import pandas as pd

# GLOBAL DATASTORE
current_dataframe = None

def set_dataframe(df):

    global current_dataframe

    current_dataframe = df

def get_dataframe():

    return current_dataframe