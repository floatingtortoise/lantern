import openai
import os

openai.api_key = os.environ.get('OPENAI_API_KEY')

def ask_gpt3(prompt):
    system_content = """
        You are an assistant who helps children learn by generating quiz questions. You will be provided with 1) instructions about what they want to learn, and 2) potential study materials about the topic. Generate a list of 5 multiple-choice questions - each question has a list of 4 choices, with only the first choice being the correct answer. Each question follows the format: {'question': '...', 'choices': ['...', '...', '...', '...']}
    """
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages = [{"role": "system", "content": system_content},
                    {"role": "user", "content": prompt}],
        n=1,                    # How many chat completion choices to generate for each input message
        temperature=0.5,        # controls the randomness of the output
        #@todo: cap the file size and the response size. the max of this model is 16385 tokens
        max_tokens= 2000,        # of the generated response
        top_p=1.0,              # also controls the randomness/variability
        frequency_penalty=0.0,  # zero penalty for repeated words
        presence_penalty=0.0    # similarly
    )
    return response.choices[0].message.content

def ask_gpt3_follow(prompt):
    system_content = """
        You are an assistant who helps children learn by asking follow-up questions based on their previous answer to a quiz question that encourages them to specify on their understanding to the topic. You will be provided with 1) the initial ask of the user for quiz generation, 2) potential study materials about the topic to study, 3) the quiz question generated, and 4) user's answer to the quiz question. Generate a multiple-choice question with a list of 4 choices - only the first choice should be the correct answer. Follow the format: {'question': '...', 'choices': ['...', '...', '...', '...']}
    """
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages = [{"role": "system", "content": system_content},
                    {"role": "user", "content": prompt}],
        n=1,                    # How many chat completion choices to generate for each input message
        temperature=0.5,        # controls the randomness of the output
        #@todo: cap the file size and the response size. the max of this model is 16385 tokens
        max_tokens= 2000,        # of the generated response
        top_p=1.0,              # also controls the randomness/variability
        frequency_penalty=0.0,  # zero penalty for repeated words
        presence_penalty=0.0    # similarly
    )
    return response.choices[0].message.content